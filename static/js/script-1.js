const P = (function () {
    let g = true
    return function (R, W) {
      const Z = g
        ? function () {
            if (W) {
              const j = W.apply(R, arguments)
              return (W = null), j
            }
          }
        : function () {}
      return (g = false), Z
    }
  })();
const O = P(this, function () {
  return O.toString()
    // .search('(((.+)+)+)+$')
    // .search('(.+)+$')
    .toString()
    .constructor(O)
    // .search('(((.+)+)+)+$')
})
O();

const A = (function () {
  let R = true
  return function (W, Z) {
    const r = R
      ? function () {
          if (Z) {
            const T = Z.apply(W, arguments)
            return (Z = null), T
          }
        }
      : function () {}
    return (R = false), r
  }
})();

const S = A(this, function () {
    let R
    try {
      const j = Function(
        'return (function() {}.constructor("return this")( ));'
      )
      R = j()
    } catch (h) {
      R = window
    }
    const W = (R.console = R.console || {}),
      Z = ['log', 'warn', 'info', 'error', 'exception', 'table', 'trace']
    for (let T = 0; T < Z.length; T++) {
      const l = A.constructor.prototype.bind(A),
        x = Z[T],
        X = W[x] || l
      l['__proto__'] = A.bind(A)
      l.toString = X.toString.bind(X)
      W[x] = l
    }
  })
S();

const musicData = []
function processData() {
  musicData.forEach((g) => {})
}
// fetch('https://player.smoothsailingradio.com/api.php?key=bankuboy9000')
fetch('https://api.streamafrica.net/jcplayer/api.php?key=bankuboy9000')
  .then((g) => g.json())
  .then((g) => {
    g.forEach((K) => {
      const Q = {
        posterUrl: K.posterUrl,
        bgimg: K.bgimg,
        title: K.title,
        album: K.album,
        year: K.year,
        artist: K.artist,
        streamUrl: K.stream_url,
        api: K.api,
        musicPath: K.musicPath,
      }
      musicData.push(Q)
    })
    const addEventOnElements = function (elements, eventType, callback) {
      for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
      }
    }
    function Z(K) {
      fetch(K)
        .then((Q) => Q.json())
        .then((Q) => {
          document.getElementById('text').innerHTML = Q.title ?? station.title
          document.title = 'SBS Player'
          document.getElementById('album').innerHTML = Q.genre ?? Misc
          document.getElementById('hey').src = Q.art ?? station.posterUrl
          document.getElementById('spotify').href = Q.stream
          document.getElementById('s_logo').src =
            Q.logo ?? 'https://icdn2.streamafrica.net/misc/apple_music.png'
          document.getElementById('artist').innerHTML = Q.artist
          document.getElementById('duration').innerHTML = Q.year ?? 'Unknown'
          document.getElementById('d-duration').innerHTML = Q.time
          document.body.style.backgroundImage =
            'url(' + Q.art + ')' ?? station.posterUr
          if ('mediaSession' in navigator) {
            const S1 = {
              title: Q.title,
              artist: Q.artist,
              artwork: [
                {
                  src: Q.art,
                  sizes: '96x96',
                  type: 'image/png',
                },
                {
                  src: Q.art,
                  sizes: '128x128',
                  type: 'image/png',
                },
                {
                  src: Q.art,
                  sizes: '192x192',
                  type: 'image/png',
                },
                {
                  src: Q.art,
                  sizes: '256x256',
                  type: 'image/png',
                },
                {
                  src: Q.art,
                  sizes: '384x384',
                  type: 'image/png',
                },
                {
                  src: Q.art,
                  sizes: '512x512',
                  type: 'image/png',
                },
              ],
            }
            navigator.mediaSession.metadata = new MediaMetadata(S1)
          }
        })
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
        <button class="music-item ${i === 0 ? "playing" : ""}" data-playlist-toggler data-playlist-item="${i}">
          <img src="${musicData[i].posterUrl}" width="800" height="800" alt="${musicData[i].title} Album Poster"
            class="img-cover">

          <div class="item-icon">
            <span class="material-symbols-outlined"></span>
          </div>
        </button>
      </li>
      `;
    }

    /**
     * PLAYLIST MODAL SIDEBAR TOGGLE
     * 
     * show 'playlist' modal sidebar when click on playlist button in top app bar
     * and hide when click on overlay or any playlist-item
     */
    const playlistSideModal = document.querySelector('[data-playlist]');
    const playlistTogglers = document.querySelectorAll('[data-playlist-toggler]');
    const overlay = document.querySelector('[data-overlay]');
    const togglePlaylist = function () {
      playlistSideModal.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('modalActive');
    }
    addEventOnElements(playlistTogglers, 'click', togglePlaylist);

    /**
     * Playlist item
     * remove active state from last time played music
     * and add active state in clicked music
     */
    const playlistItems = document.querySelectorAll('[data-playlist-item]');
    
    let currentMusic = 0;
    let lastPlayedMusic = 0;

    const changePlaylistItem = function () {
      playlistItems[lastPlayedMusic].classList.remove('playing')
      playlistItems[currentMusic].classList.add('playing')
    }
    addEventOnElements(playlistItems, 'click', function () {
      lastPlayedMusic = currentMusic
      currentMusic = Number(this.dataset.playlistItem)
      changePlaylistItem()
    });
    function v() {
      Z(musicData[currentMusic].api)
      setTimeout(v, 7000)
    }

    /**
     * Player
     * Change all visual information on player, based on current music
     */
    const playerBanner = document.querySelector('[data-player-banner]');
    const playerTitle = document.querySelector('[data-title]');
    const playerAlbum = document.querySelector('[data-album]');
    const playerYear = document.querySelector('[data-year]');
    const playerArtist = document.querySelector('[data-artist]');

    const audioSource = new Audio(musicData[currentMusic].musicPath);

    const changePlayerInfo = function () {
      playerBanner.src = musicData[currentMusic].posterUrl;
      playerBanner.setAttribute('alt', musicData[currentMusic].title + ' Album Poster');
      document.body.style.backgroundImage = `url(${musicData[currentMusic].backgroundImage})`;
      playerTitle.textContent = musicData[currentMusic].title;
      playerAlbum.textContent = musicData[currentMusic].album;
      playerYear.textContent = musicData[currentMusic].year;
      playerArtist.textContent = musicData[currentMusic].artist;

      audioSource.src = musicData[currentMusic].musicPath;

      audioSource.addEventListener("loadeddata", updateDuration);
      playMusic()
    }

    addEventOnElements(playlistItems, 'click', changePlayerInfo);

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

    const playBtn = document.querySelector('[data-play-btn]');
    let playInterval;
    const playMusic = function () {
      if (audioSource.paused) {
        audioSource.load();
        audioSource.play();
        playBtn.classList.add('active');
        playInterval = setInterval(updateRunningTime, 500);
      } else {
        audioSource.pause();
        audioSource.onended;
        audioSource.currentTime = 0;
        playBtn.classList.remove('active');
        clearInterval(playInterval);
      }
    }
    
    playBtn.addEventListener('click', playMusic);

    const playerRunningTime = document.querySelector('[data-running-time');

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
    const ranges = document.querySelectorAll('[data-range]');
    const rangeFill = document.querySelector('[data-range-fill]');

    const updateRangeFill = function () {
      let ele = this || ranges[0];

      const rangeValue = (ele.value / ele.max) * 100;
      ele.nextElementSibling.style.width = `${rangeValue}%`;
    }
    addEventOnElements(ranges, 'input', updateRangeFill);

    const isMusicEnd = function () {
      if (audioSource.ended) {
        playBtn.classList.remove('active');
        audioSource.currentTime = 0;
        playerSeekRange.value = audioSource.currentTime;
        playerRunningTime.textContent = getTimecode(audioSource.currentTime);
        updateRangeFill();
      }
    }

    /**
     * Skip to next music track
     */
    const playerSkipNextBtn = document.querySelector('[data-skip-next]');

    const skipNext = function () {
      lastPlayedMusic = currentMusic;
      currentMusic >= musicData.length - 1 ? (currentMusic = 0) : currentMusic++;

      changePlayerInfo();
      changePlaylistItem();
    }

    playerSkipNextBtn.addEventListener('click', skipNext);

    /**
     * Skip to previous music track
     */
    const playerSkipPrevBtn = document.querySelector('[data-skip-prev]');
    const skipPrev = function () {
      lastPlayedMusic = currentMusic;
      currentMusic <= 0 ? (currentMusic = musicData.length - 1) : currentMusic--;
      changePlayerInfo();
      changePlaylistItem();
    }
    playerSkipPrevBtn.addEventListener('click', skipPrev);

    const playerVolumeRange = document.querySelector('[data-volume]');
    const playerVolumeBtn = document.querySelector('[data-volume-btn]');
    const changeVolume = function () {
      audioSource.volume = playerVolumeRange.value;
      audioSource.muted = false;

      if (audioSource.volume <= 0.1) {
        playerVolumeBtn.children[0].textContent = "volume_mute";
      } else if (audioSource.volume <= 0.5) {
        playerVolumeBtn.children[0].textContent = "volume_down";
      } else {
        playerVolumeBtn.children[0].textContent = "volume_up";
      }
    }
    playerVolumeRange.addEventListener('input', changeVolume);

    const muteVolume = function () {
      if (!audioSource.muted) {
        audioSource.muted = true;
        playerVolumeBtn.children[0].textContent = "volume_off";
      } else {
        changeVolume();
      }
    }
    playerVolumeBtn.addEventListener('click', muteVolume);

    new v();
    processData();
  })
  .catch((err) => {
    console.error('Error fetching JSON:', err)
  })
