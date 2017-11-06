'use strict'

import {state, elements} from './state'

let isOpen = false

function initDebugger(app) {

  const debugOpen = document.querySelector('#debugger-open')
  const debugContent = document.querySelector('#debugger-content')
  const debugContainer = document.querySelector('#debugger')

  debugOpen.addEventListener('click', () => {

    isOpen = !isOpen

    if (isOpen) {
      debugContainer.style.display = 'block'
      debugContent.innerHTML = JSON.stringify(state, null, 2)
      app.ticker.stop()
    } else {
      debugContainer.style.display = 'none'
      debugContent.innerHTML = ''
      app.ticker.start()
    }

  })

}


export default initDebugger