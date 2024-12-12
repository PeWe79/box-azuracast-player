"use strict";
/**
 * Music / Radio definitions
 */
const musicData = [];
// AzuraCast base
const apiBase = "https://s1.cloudmu.id";

/**
 * Fetch API data from Azuracast server
 */
function fetchData() {
	fetch(apiBase + "/api/nowplaying")
		.then((res) => (res.ok || checkError("Failed to load API data", () => location.load()), res.json()))
		.then((data) => {
			data.forEach((reslt) => {
				const randomNumber = Math.floor(Math.random() * 5);
				const fileName = ".jpg";
				const extension = fileName.split("/").pop();

				const apiData = {
					posterUrl: reslt.now_playing.song.art,
					imgBrand: apiBase + "/static/uploads/" + reslt.station.shortcode + "/" + "album_art." + randomNumber + extension,
					bgimg: reslt.now_playing.song.art,
					title: reslt.now_playing.song.title,
					album: reslt.now_playing.song.album,
					name: reslt.station.name,
					shortcode: reslt.station.shortcode,
					artist: reslt.now_playing.song.artist,
					streamUrl: reslt.station.listen_url,
					api: apiBase + "/api/nowplaying_static/" + reslt.station.shortcode + ".json",
					duration: reslt.now_playing.duration,
					play_at: reslt.now_playing.play_at,
					elapsed: reslt.now_playing.elapsed,
					remaining: reslt.now_playing.remaining,
				};
				musicData.push(apiData);
			}),
				processData();
		})
		.catch((err) => {
			console.error("Error fetching JSON:", err);
		});
}

function checkError(data) {
	console.error("Error loading data:", data);
}

fetchData();

function processData() {
	const addEventOnElements = function (elements, eventType, callback) {
		for (let i = 0, len = elements.length; i < len; i++) {
			elements[i].addEventListener(eventType, callback);
		}
	};

	async function getMusicData(data) {
		try {
			const resp = await fetch(data);
			if (!resp.ok) {
				throw new Error("HTTP error! Status: " + resp.status);
			}
			const dataGet = await resp.json();
			getDataSelected(dataGet.now_playing);
			getDuration(dataGet.now_playing);
		} catch (err) {
			console.error("Error loading data:", err);
		}
	}

	/**
	 * Get selected music data
	 * @param {*} data
	 */
	function getDataSelected(data) {
		const {
			artist: artist = data.song.artist,
			title: title = data.song.title,
			album: album = data.song.album || "Unknown",
			stream: stream = "https://open.spotify.com/search/" +
			encodeURIComponent(artist + " - " + title),
			logo: logo = "./static/images/misc/spotify.png",
		} = data.song;
		document.getElementById("text").innerHTML = title;
		document.title = artist + " | " + title;
		document.getElementById("album").innerHTML = album;
		document.getElementById("spotify").href = stream;
		document.getElementById("s_logo").src = logo;
		document.getElementById("artist").innerHTML = artist;
		getCoverArt(artist, title);
	}

	/**
	 * Get duration
	 */
	function getDuration(callback) {
		const time = callback.duration;
		const mTime = getTimecode(time);
		document.getElementById("d-duration").innerHTML = mTime || "Unknown";
	}

	/**
	 * PLAYLIST
	 *
	 * add all music in playlist, from 'musicData'
	 */
	const playlist = document.querySelector("[data-music-list]");
	for (let i = 0, len = musicData.length; i < len; i++) {
		playlist.innerHTML += `
				<li>
					<p class="label-md" id="station">${musicData[i].name}</p>
					<button class="music-item ${i === 0 ? "playing" : ""}" data-playlist-toggler data-playlist-item="${i}">
						<img src="${musicData[i].imgBrand}" width="800" height="800" alt="${musicData[i].title} Album Poster"
							class="img-cover">

						<div class="item-icon">
							<span class="material-symbols-rounded">equalizer</span>
						</div>
					</button>
				</li>
			`;
	}

	/**
	 * Playlist item
	 * remove active state from last time played music
	 * and add active state in clicked music
	 */
	const playlistSideModal = document.querySelector("[data-playlist]");
	const playlistTogglers = document.querySelectorAll("[data-playlist-toggler]");
	const overlay = document.querySelector("[data-overlay]");

	const togglePlaylist = function () {
		playlistSideModal.classList.toggle("active");
		overlay.classList.toggle("active");
		document.body.classList.toggle("modalActive");
	}
	addEventOnElements(playlistTogglers, "click", togglePlaylist);

	/**
	 * Playlist item
	 * remove active state from last time played music
	 * and add active state in clicked music
	 */
	const playlistItems = document.querySelectorAll("[data-playlist-item]");

	let currentMusic = 0;
	let lastPlayedMusic = 0;

	const changePlaylistItem = () => {
		playlistItems[lastPlayedMusic].classList.remove("playing");
		playlistItems[currentMusic].classList.add("playing");
	};

	addEventOnElements(playlistItems, "click", function () {
		lastPlayedMusic = currentMusic;
		currentMusic = Number(this.dataset.playlistItem);
		changePlaylistItem();
	});

	/**
	 * Player
	 * Change all visual information on player, based on current music
	 */
	const playerBanner = document.querySelector("[data-player-banner]");
	const playerTitle = document.querySelector("[data-title]");
	const playerAlbum = document.querySelector("[data-album]");
	const playerArtist = document.querySelector("[data-artist]");

	const audioSource = new Audio(musicData[currentMusic].streamUrl);

	const changePlayerInfo = () => {
		playerBanner.setAttribute("alt", `${musicData[currentMusic].title} Album Poster`);
		playerArtist.textContent = musicData[currentMusic].artist;
		playerTitle.textContent = musicData[currentMusic].title;
		playerAlbum.textContent = musicData[currentMusic].album;

		audioSource.src = musicData[currentMusic].streamUrl;
		audioSource.addEventListener("loadeddata", updateDuration);
		playMusic();
	};
	addEventOnElements(playlistItems, "click", changePlayerInfo);

	/** update player duration */
	const playerDuration = document.querySelector("[data-duration]");
	const playerSeekRange = document.querySelector("[data-seek]");

	/** pass seconds and get timcode formate */
	const getTimecode = function (duration) {
		const minutes = Math.floor(duration / 60);
		const seconds = Math.ceil(duration - minutes * 60);
		const timecode = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
		return timecode;
	};

	const updateDuration = function () {
		playerSeekRange.max = Math.ceil(audioSource.duration);
		playerDuration.textContent = getTimecode(Number(playerSeekRange.max));
	};
	audioSource.addEventListener("loadeddata", updateDuration);

	const playBtn = document.querySelector("[data-play-btn]");
	let playInterval;

	const playMusic = function () {
		if (audioSource.paused) {
			audioSource.load();
			audioSource.play();
			playBtn.classList.add("active");
			playInterval = setInterval(updateRunningTime, 500);
		} else {
			audioSource.pause();
			playBtn.classList.remove("active");
			clearInterval(playInterval);
		}
	};
	playBtn.addEventListener("click", playMusic);

	/**
	 * player running time update
	 */
	const playerRunningTime = document.querySelector("[data-running-time");
	const updateRunningTime = function () {
		playerSeekRange.value = audioSource.currentTime;
		playerRunningTime.textContent = getTimecode(audioSource.currentTime);

		updateRangeFill();
		isMusicEnd();
	};

	/**
	 * RANGE FILL WIDTH
	 *
	 * change 'rangeFill' width, while changing range value
	 */
	const ranges = document.querySelectorAll("[data-range]");
	const rangeFill = document.querySelector("[data-range-fill]");

	const updateRangeFill = function () {
		let ele = this || ranges[0];

		const rangeValue = (ele.value / ele.max) * 100;
		ele.nextElementSibling.style.width = `${rangeValue}%`;
	};
	addEventOnElements(ranges, "input", updateRangeFill);

	/**
	 * SEEK MUSIC
	 *
	 * seek music while changing player seek range
	 */
	const seek = function () {
		audioSource.currentTime = playerSeekRange.value;
		playerRunningTime.textContent = getTimecode(playerSeekRange.value);
	};
	playerSeekRange.addEventListener("input", seek);

	/**
	 * End music
	 */
	const isMusicEnd = function () {
		if (audioSource.ended) {
			playBtn.classList.remove("active");
			audioSource.currentTime = 0;
			playerSeekRange.value = audioSource.currentTime;
			playerRunningTime.textContent = getTimecode(audioSource.currentTime);
			updateRangeFill();
		}
	};

	/**
	 * Skip to next music track
	 */
	const playerSkipNextBtn = document.querySelector("[data-skip-next]");
	const skipNext = function () {
		lastPlayedMusic = currentMusic;
		currentMusic >= musicData.length - 1
			? (currentMusic = 0)
			: currentMusic++;
		changePlayerInfo();
		changePlaylistItem();
	};
	playerSkipNextBtn.addEventListener("click", skipNext);

	/**
	 * Skip to previous music track
	 */
	const playerSkipPrevBtn = document.querySelector("[data-skip-prev]");
	const skipPrev = function () {
		lastPlayedMusic = currentMusic;
		currentMusic <= 0
			? (currentMusic = musicData.length - 1)
			: currentMusic--;
		changePlayerInfo();
		changePlaylistItem();
	};
	playerSkipPrevBtn.addEventListener("click", skipPrev);

	/**
	 * Volume
	 */
	const playerVolumeRange = document.querySelector("[data-volume]");
	const playerVolumeBtn = document.querySelector("[data-volume-btn]");

	const changeVolume = function () {
		audioSource.volume = playerVolumeRange.value;
		audioSource.muted = false;
		if (audioSource.volume <= 0.1) {
			playerVolumeBtn.children[0].textContent = "volume_mute";
		} else {
			if (audioSource.volume <= 0.5) {
				playerVolumeBtn.children[0].textContent = "volume_down";
			} else {
				playerVolumeBtn.children[0].textContent = "volume_up";
			}
		}
	};
	playerVolumeRange.addEventListener("input", changeVolume);

	/**
	 * Mute
	 */
	const muteVolume = function () {
		if (!audioSource.muted) {
			audioSource.muted = true;
			playerVolumeBtn.children[0].textContent = "volume_off";
		} else {
			changeVolume();
		}
	};
	playerVolumeBtn.addEventListener("click", muteVolume);

	const getCoverArt = function (a, t) {
		var urlCoverArt = musicData[currentMusic].posterUrl;
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				const data = JSON.parse(this.responseText);
				const artworkUrl100 = (data.resultCount) ? data.results[0].artworkUrl100 : urlCoverArt;

				urlCoverArt = (artworkUrl100 != urlCoverArt) ? artworkUrl100.replace('100x100bb', '512x512bb') : urlCoverArt;
				var urlCoverArt96 = (artworkUrl100 != urlCoverArt) ? urlCoverArt.replace('512x512bb', '96x96bb') : urlCoverArt;
				var urlCoverArt128 = (artworkUrl100 != urlCoverArt) ? urlCoverArt.replace('512x512bb', '128x128bb') : urlCoverArt;
				var urlCoverArt192 = (artworkUrl100 != urlCoverArt) ? urlCoverArt.replace('512x512bb', '192x192bb') : urlCoverArt;
				var urlCoverArt256 = (artworkUrl100 != urlCoverArt) ? urlCoverArt.replace('512x512bb', '256x256bb') : urlCoverArt;
				var urlCoverArt384 = (artworkUrl100 != urlCoverArt) ? urlCoverArt.replace('512x512bb', '384x384bb') : urlCoverArt;

				playerBanner.src = urlCoverArt;
				document.body.style.backgroundImage = `url(${urlCoverArt})`;
				playerBanner.setAttribute("alt", `${t} Album Poster`);

				if ('mediaSession' in navigator) {
					navigator.mediaSession.metadata = new MediaMetadata({
						title: t,
						artist: a,
						artwork: [
							{
								src: urlCoverArt96,
								sizes: '96x96',
								type: 'image/png'
							},
							{
								src: urlCoverArt128,
								sizes: '128x128',
								type: 'image/png'
							},
							{
								src: urlCoverArt192,
								sizes: '192x192',
								type: 'image/png'
							},
							{
								src: urlCoverArt256,
								sizes: '256x256',
								type: 'image/png'
							},
							{
								src: urlCoverArt384,
								sizes: '384x384',
								type: 'image/png'
							},
							{
								src: urlCoverArt,
								sizes: '512x512',
								type: 'image/png'
							}
						]
					});
				}
			}
		}
		xhttp.open('GET', 'https://itunes.apple.com/search?term=' + a + " - " + t + '&media=music&limit=1', true);
		xhttp.crossOrigin = "anonymous";
		xhttp.send();
	}

	function getData() {
		setInterval(() => {
			getMusicData(musicData[currentMusic].api);
		}, 3000);
	}
	getData();
}
