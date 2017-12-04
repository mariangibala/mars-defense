'use strict'

function initPause(app) {

  let isPaused = false

  window.addEventListener('keyup', function (e) {

    if (e.keyCode !== 80) return

    isPaused = !isPaused

    if (isPaused === false) {
      app.ticker.stop()
    } else {
      app.ticker.start()
    }

  })

}

export default initPause