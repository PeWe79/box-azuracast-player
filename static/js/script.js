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
  })(),
  O = P(this, function () {
    return O.toString()
      // .search('(((.+)+)+)+$')
      // .search('(.+)+$')
      .toString()
      .constructor(O)
      // .search('(((.+)+)+)+$')
  })
O()
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
  })(),
  S = A(this, function () {
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
S()
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
    const W = function (K, Q, y) {
      for (let S1 = 0, S2 = K.length; S1 < S2; S1++) {
        K[S1].addEventListener(Q, y)
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
    const j = document.querySelector('[data-music-list]')
    for (let K = 0, Q = musicData.length; K < Q; K++) {
      j.innerHTML +=
        '\n      <li>\n        <button class="music-item ' +
        (K === 0 ? 'playing' : '') +
        '" data-playlist-toggler data-playlist-item="' +
        K +
        '">\n          <img src="' +
        musicData[K].posterUrl +
        '" loading="lazy" width="500" height="500" alt="' +
        musicData[K].title +
        ' Album Poster"\n            class="img-cover">\n    \n          <div class="item-icon">\n            <span class="material-symbols-outlined"></span>\n          </div>\n        </button>\n      </li>\n      '
    }
    const r = document.querySelector('[data-playlist]'),
      h = document.querySelectorAll('[data-playlist-toggler]'),
      T = document.querySelector('[data-overlay]'),
      l = function () {
        r.classList.toggle('active')
        T.classList.toggle('active')
        document.body.classList.toggle('modalActive')
      }
    W(h, 'click', l)
    const x = document.querySelectorAll('[data-playlist-item]')
    let X = 0,
      m = 0
    const t = function () {
      x[m].classList.remove('playing')
      x[X].classList.add('playing')
    }
    W(x, 'click', function () {
      m = X
      X = Number(this.dataset.playlistItem)
      t()
    })
    function v() {
      Z(musicData[X].api)
      setTimeout(v, 7000)
    }
    const q = document.querySelector('[data-player-banner]'),
      J = document.querySelector('[data-title]'),
      b = document.querySelector('[data-album]'),
      L = document.querySelector('[data-year]'),
      a = document.querySelector('[data-artist]'),
      Y = new Audio(musicData[X].musicPath),
      n = function () {
        q.src = musicData[X].posterUrl
        q.setAttribute('alt', musicData[X].title + ' Album Poster')
        document.body.style.backgroundImage =
          'url(' + musicData[X].backgroundImage + ')'
        J.textContent = musicData[X].title
        b.textContent = musicData[X].album
        L.textContent = musicData[X].year
        a.textContent = musicData[X].artist
        Y.src = musicData[X].musicPath
        Y.addEventListener('loadeddata', V)
        I()
      }
    W(x, 'click', n)
    const G = document.querySelector('[data-duration]'),
      s = document.querySelector('[data-seek]'),
      M = function (y) {
        const S0 = Math.floor(y / 60),
          S1 = Math.ceil(y - S0 * 60),
          S2 = S0 + ':' + (S1 < 10 ? '0' : '') + S1
        return S2
      },
      V = function () {
        s.max = Math.ceil(Y.duration)
      }
    Y.addEventListener('loadeddata', V)
    const u = document.querySelector('[data-play-btn]')
    let U
    const I = function () {
      if (Y.paused) {
        Y.load()
        Y.play()
        u.classList.add('active')
        U = setInterval(E, 500)
      } else {
        Y.pause()
        Y.onended
        Y.currentTime = 0
        u.classList.remove('active')
        clearInterval(U)
      }
    }
    u.addEventListener('click', I)
    const d = document.querySelector('[data-running-time'),
      E = function () {
        s.value = Y.currentTime
        d.textContent = M(Y.currentTime)
        D()
        N()
      },
      o = document.querySelectorAll('[data-range]'),
      w = document.querySelector('[data-range-fill]'),
      D = function () {
        let y = this || o[0]
        const S0 = (y.value / y.max) * 100
        y.nextElementSibling.style.width = S0 + '%'
      }
    W(o, 'input', D)
    const N = function () {
        if (Y.ended) {
          u.classList.remove('active')
          Y.currentTime = 0
          s.value = Y.currentTime
          d.textContent = M(Y.currentTime)
          D()
        }
      },
      z = document.querySelector('[data-skip-next]'),
      C = function () {
        m = X
        X >= musicData.length - 1 ? (X = 0) : X++
        n()
        t()
      }
    z.addEventListener('click', C)
    const c = document.querySelector('[data-skip-prev]'),
      F = function () {
        m = X
        X <= 0 ? (X = musicData.length - 1) : X--
        n()
        t()
      }
    c.addEventListener('click', F)
    const H = document.querySelector('[data-volume]'),
      p = document.querySelector('[data-volume-btn]'),
      f = function () {
        Y.volume = H.value
        Y.muted = false
        if (Y.volume <= 0.1) {
          p.children[0].textContent = 'volume_mute'
        } else {
          Y.volume <= 0.5
            ? (p.children[0].textContent = 'volume_down')
            : (p.children[0].textContent = 'volume_up')
        }
      }
    H.addEventListener('input', f)
    const B = function () {
      !Y.muted
        ? ((Y.muted = true), (p.children[0].textContent = 'volume_off'))
        : f()
    }
    p.addEventListener('click', B)
    new v()
    processData()
  })
  .catch((R) => {
    console.error('Error fetching JSON:', R)
  })
