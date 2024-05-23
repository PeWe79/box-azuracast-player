// const _0x4fb01a = (function () {
//     let _0xdb5cd5 = true
//     return function (_0x4dbc22, _0x591289) {
//       const _0x1324d8 = _0xdb5cd5
//         ? function () {
//             if (_0x591289) {
//               const _0x5f0514 = _0x591289.apply(_0x4dbc22, arguments)
//               return (_0x591289 = null), _0x5f0514
//             }
//           }
//         : function () {}
//       return (_0xdb5cd5 = false), _0x1324d8
//     }
//   })(),
//   _0x5ccc58 = _0x4fb01a(this, function () {
//     return _0x5ccc58
//       .toString()
//       .search('(((.+)+)+)+$')
//       .toString()
//       .constructor(_0x5ccc58)
//       .search('(((.+)+)+)+$')
//   })
// _0x5ccc58()
// const _0x579598 = (function () {
//     let _0x3cd6e2 = true
//     return function (_0x1deddd, _0x269edc) {
//       const _0x4f5bf7 = _0x3cd6e2
//         ? function () {
//             if (_0x269edc) {
//               const _0x26136d = _0x269edc.apply(_0x1deddd, arguments)
//               return (_0x269edc = null), _0x26136d
//             }
//           }
//         : function () {}
//       _0x3cd6e2 = false
//       return _0x4f5bf7
//     }
//   })(),
//   _0xcc2cfb = _0x579598(this, function () {
//     const _0x4a4ff8 = function () {
//       let _0x365d2f
//       try {
//         _0x365d2f = Function(
//           'return (function() {}.constructor("return this")( ));'
//         )()
//       } catch (_0xaa6fb9) {
//         _0x365d2f = window
//       }
//       return _0x365d2f
//     }
//     const _0x3eea32 = _0x4a4ff8(),
//       _0x149987 = (_0x3eea32.console = _0x3eea32.console || {}),
//       _0x178e13 = [
//         'log',
//         'warn',
//         'info',
//         'error',
//         'exception',
//         'table',
//         'trace',
//       ]
//     for (let _0x59d56b = 0; _0x59d56b < _0x178e13.length; _0x59d56b++) {
//       const _0x46e388 = _0x579598.constructor.prototype.bind(_0x579598),
//         _0x2e1045 = _0x178e13[_0x59d56b],
//         _0x184f53 = _0x149987[_0x2e1045] || _0x46e388
//       _0x46e388['__proto__'] = _0x579598.bind(_0x579598)
//       _0x46e388.toString = _0x184f53.toString.bind(_0x184f53)
//       _0x149987[_0x2e1045] = _0x46e388
//     }
//   })
// _0xcc2cfb()
const musicData = [];
function processData() {
	musicData.forEach((_0x3ba6c9) => {});
}
fetch("https://api.streamafrica.net/jcplayer/api.php?key=bankuboy9000")
	.then((res) => res.json())
	.then((data) => {
		data.forEach((reslt) => {
			const apiData = {
				posterUrl: reslt.posterUrl,
				bgimg: reslt.bgimg,
				title: reslt.title,
				album: reslt.album,
				year: reslt.year,
				artist: reslt.artist,
				streamUrl: reslt.stream_url,
				api: reslt.api,
				musicPath: reslt.musicPath,
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
				const hasil = await resp.json();
				getApiData(hasil);
				getMetaData(hasil);
			} catch (err) {
				loadData(err);
			}
		}
		function getApiData(data) {
			const {
				title: title = station.title,
				genre: genre = station.album,
				art: art = station.posterUrl,
				stream: stream = "#",
				logo: logo = "default_logo_url",
				artist: artist = station.artist,
				year: year = "Unknown",
				time: mTime,
			} = data;
			document.getElementById("text").innerHTML = title;
			document.title = "JC Player Pro";
			document.getElementById("album").innerHTML = genre;
			document.getElementById("hey").src = art;
			document.getElementById("spotify").href = stream;
			document.getElementById("s_logo").src = logo;
			document.getElementById("artist").innerHTML = artist;
			document.getElementById("duration").innerHTML = year;
			document.getElementById("d-duration").innerHTML = mTime || "Unknown";
			document.body.style.backgroundImage = "url(" + art + ")";
		}
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
		function loadData(_0x176556) {
			console.error("Error loading data:", _0x176556);
		}
		function _0x39804b(_0x337809, _0x46562d) {
			const _0x509a34 = document.querySelector(_0x337809);
			_0x509a34 && (_0x509a34.innerHTML = _0x46562d);
		}
		function _0x260005(_0x140d85, _0x56a97f) {
			const _0x36429b = document.querySelector(_0x140d85);
			_0x36429b && (_0x36429b.src = _0x56a97f);
		}
		function _0x3e4f04(_0x5b069d, _0x2a76ae) {
			const _0x5cf244 = document.querySelector(_0x5b069d);
			_0x5cf244 && (_0x5cf244.href = _0x2a76ae);
		}

		/**
		 * PLAYLIST
		 *
		 * add all music in playlist, from 'musicData'
		 */
		const playlist = document.querySelector("[data-music-list]");
		musicData.forEach((mt, np) => {
			const ele = document.createElement("li");
			ele.innerHTML =
				'<button class="music-item ' +
				(np === 0 ? "playing" : "") +
				'" data-playlist-toggler data-playlist-item="' +
				np +
				'"><img src="' +
				mt.posterUrl +
				'" loading="lazy" width="500" height="500" alt="' +
				mt.title +
				' Album Poster" class="img-cover"><div class="item-icon"><span class="material-symbols-outlined"></span></div></button>';
			playlist.appendChild(ele);
		});

		/**
		 * Playlist item
		 * remove active state from last time played music
		 * and add active state in clicked music
		 */
		const playlistSideModal = document.querySelector("[data-playlist]");
		const overlay = document.querySelector("[data-overlay]");
		document.addEventListener("click", (_0x50363e) => {
			const playlistTogglers = _0x50363e.target.closest(
				"[data-playlist-toggler]"
			);
			playlistTogglers &&
				(playlistSideModal.classList.toggle("active"),
				overlay.classList.toggle("active"),
				document.body.classList.toggle("modalActive"));
		});

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
		playlistItems.forEach((data) => {
			data.addEventListener("click", function () {
				lastPlayedMusic = currentMusic;
				currentMusic = Number(this.dataset.playlistItem);
				changePlaylistItem();
			});
		});

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
		const playerYear = document.querySelector("[data-year]");
		const playerArtist = document.querySelector("[data-artist]");

		const audioSource = new Audio(musicData[currentMusic].musicPath);

		const changePlayerInfo = () => {
			const mscDt = musicData[currentMusic];
			playerBanner.src = mscDt.posterUrl;
			playerBanner.setAttribute("alt", mscDt.title + " Album Poster");
			document.body.style.backgroundImage = `url(${musicData[currentMusic].backgroundImage})`;
			// document.body.style.backgroundImage = "url(" + mscDt.backgroundImage + ")"; // jangan dihapus
			playerTitle.textContent = mscDt.title;
			playerAlbum.textContent = mscDt.album;
			playerYear.textContent = mscDt.year;
			playerArtist.textContent = mscDt.artist;
			audioSource.src = mscDt.musicPath;
			playMusic();
		};
		addEventOnElements(playlistItems, "click", changePlayerInfo);

    /** update player duration */
    const playerDuration = document.querySelector('[data-duration]');
    const playerSeekRange = document.querySelector('[data-seek]');

    /** pass seconds and get timcode formate */
    const getTimecode = function (duration) {
      const minutes = Math.floor(duration / 60);
      const seconds = Math.ceil(duration - (minutes * 60));
      const timecode = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      return timecode;
    }

    const updateDuration = function () {
      playerSeekRange.max = Math.ceil(audioSource.duration);
      playerDuration.textContent = getTimecode(Number(playerSeekRange.max));
    }
    audioSource.addEventListener('loadeddata', updateDuration);

		const playBtn = document.querySelector("[data-play-btn]");
    let playInterval;

		const playMusic = function () {
			audioSource.paused
				? (getMusicData(musicData[currentMusic].api),
				  audioSource.load(),
				  audioSource.play(),
				  playBtn.classList.add("active"),
          playInterval = setInterval(updateRunningTime, 500))
				: (audioSource.pause(),
				  audioSource.onended,
				  (audioSource.currentTime = 0),
				  playBtn.classList.remove("active"));
		};
		playBtn.addEventListener("click", playMusic);

    /**
     * player running time update
     */
    const playerRunningTime = document.querySelector('[data-running-time');
    const updateRunningTime = function () {
      playerSeekRange.value = audioSource.currentTime;
      playerRunningTime.textContent = getTimecode(audioSource.currentTime);

      // updateRangeFill();
      isMusicEnd();
    }

		/**
		 * RANGE FILL WIDTH
		 *
		 * change 'rangeFill' width, while changing range value
		 */
		const ranges = document.querySelectorAll("[data-range]");
		const _0x21e01c = document.querySelector("[data-range-fill]");

		const updateRangeFill = function () {
			let ele = this || ranges[0];

			const rangeValue = (ele.value / ele.max) * 100;
			ele.nextElementSibling.style.width = `${rangeValue}%`;
		};
		addEventOnElements(ranges, "input", updateRangeFill);

		const isMusicEnd = function () {
			audioSource.ended &&
				(playBtn.classList.remove("active"),
				(audioSource.currentTime = 0),
				updateRangeFill());
		};

		/**
		 * Skip to next music track
		 */
		const playerSkipNextBtn = document.querySelector("[data-skip-next]");
		const skipNext = function () {
			(lastPlayedMusic = currentMusic),
				currentMusic >= musicData.length - 1
					? (currentMusic = 0)
					: currentMusic++,
				changePlayerInfo(),
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
