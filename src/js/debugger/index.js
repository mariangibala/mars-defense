'use strict'

import {state} from '../state'

function initDebugger(app) {

  let isOpen = false

  const debugOpen = document.querySelector('#debugger-open')
  const debugContent = document.querySelector('#debugger-content')
  const debugContainer = document.querySelector('#debugger')

  if (!debugOpen || !debugContent || !debugContainer){
    console.log('Couldn\'t initialize debugger - missing DOM elements')
    return
  }

  debugOpen.addEventListener('click', function () {

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