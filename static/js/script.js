"use strict";
/**
 * Music / Radio definitions
 */
const musicData = [];
// AzuraCast base
const apiBase = "https://s1.cloudmu.id";

/**
 * Process data
 */
function processData() {
	musicData.forEach((_data) => { });
}

fetch(apiBase + "/api/nowplaying")
	.then((res) => res.json())
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
				name: reslt.station.description,
				shortcode: reslt.station.shortcode,
				artist: reslt.now_playing.song.artist,
				streamUrl: reslt.station.listen_url,
				api: apiBase + "/api/nowplaying_static/" + reslt.station.shortcode + ".json",
				musicPath: reslt.station.listen_url,
				duration: reslt.now_playing.duration,
				play_at: reslt.now_playing.play_at,
				elapsed: reslt.now_playing.elapsed,
				remaining: reslt.now_playing.remaining,
			};
			musicData.push(apiData);
		});

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
				getDataSelected(dataGet.now_playing.song);
				getMetaData(dataGet.now_playing.song);
				getDuration(dataGet.now_playing);
			} catch (err) {
				checkError(err);
				// console.log("Error get : " + err);
			}
		}

		/**
		 * Get selected music data
		 * @param {*} data
		 */
		function getDataSelected(data) {
			const {
				artist: artist = station.artist,
				title: title = station.title,
				album: album = station.album || "Unknown",
				art: art = station.posterUrl,
				stream: stream = "https://open.spotify.com/search/" +
				encodeURIComponent(artist + " - " + title),
				logo: logo = "./static/images/misc/spotify.png",
				// year: year = "Unknown",
			} = data;
			document.getElementById("text").innerHTML = title;
			document.title = artist + " | " + title;
			document.getElementById("album").innerHTML = album;
			document.getElementById("hey").src = art;
			document.getElementById("spotify").href = stream;
			document.getElementById("s_logo").src = logo;
			document.getElementById("artist").innerHTML = artist;
			// document.getElementById("duration").innerHTML = year;
			document.body.style.backgroundImage = "url(" + art + ")";
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
		 * Callback metadata details
		 * Update to mediasession metadata
		 *
		 * @param artist
		 * @param title
		 * @param album
		 * @param cover
		 * @param {*} callback
		 */
		function getMetaData(callback) {
			if ("mediaSession" in navigator) {
				const {
					title: title = station.title,
					artist: artist = station.artist,
					art: art = station.posterUrl,
				} = callback,
					img96 = {
						src: art,
						sizes: "96x96",
						type: "image/png",
					};
				const img128 = {
					src: art,
					sizes: "128x128",
					type: "image/png",
				};
				const img192 = {
					src: art,
					sizes: "192x192",
					type: "image/png",
				};
				const img256 = {
					src: art,
					sizes: "256x256",
					type: "image/png",
				};
				const img384 = {
					src: art,
					sizes: "384x384",
					type: "image/png",
				};
				const img512 = {
					src: art,
					sizes: "512x512",
					type: "image/png",
				};
				const mData = {
					title: title,
					artist: artist,
					artwork: [img96, img128, img192, img256, img384, img512],
				};
				navigator.mediaSession.metadata = new MediaMetadata(mData);
			}
		}

		/**
		 * Check error conditions
		 * @param {*} data
		 */
		function checkError(data) {
			console.error("Error loading data:", data);
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
		 * Get current music
		 */
		function getCurrentMusic() {
			getMusicData(musicData[currentMusic].api);
			setTimeout(getCurrentMusic, 10000);
		}

		/**
		 * Player
		 * Change all visual information on player, based on current music
		 */
		const playerBanner = document.querySelector("[data-player-banner]");
		const playerTitle = document.querySelector("[data-title]");
		const playerAlbum = document.querySelector("[data-album]");
		// const playerYear = document.querySelector("[data-year]");
		const playerArtist = document.querySelector("[data-artist]");

		const audioSource = new Audio(musicData[currentMusic].musicPath);

		const changePlayerInfo = () => {
			playerBanner.src = musicData[currentMusic].posterUrl;
			playerBanner.setAttribute("alt", `${musicData[currentMusic].title} Album Poster`);
			document.body.style.backgroundImage = `url(${musicData[currentMusic].backgroundImage})`;
			playerArtist.textContent = musicData[currentMusic].artist;
			playerTitle.textContent = musicData[currentMusic].title;
			playerAlbum.textContent = musicData[currentMusic].album;
			// playerYear.textContent = musicData[currentMusic].year;

			audioSource.src = musicData[currentMusic].musicPath;

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
		getCurrentMusic();

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
		getMusicData(musicData[currentMusic].api);
		processData();
	})
	.catch((err) => {
		console.error("Error fetching JSON:", err);
	});
