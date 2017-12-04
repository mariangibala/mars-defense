'use strict'

import {state} from '../state'

function bindKey(keyCode, name) {

  state.key[name] = {
    isDown: false,
    isUp: true,
  }

  function downHandler(e) {
    if (e.keyCode !== keyCode) return

    state.key[name].isDown = true
    state.key[name].isUp = false
    e.preventDefault()
  }

  function upHandler(e) {
    if (e.keyCode !== keyCode) return

    state.key[name].isDown = false
    state.key[name].isUp = true
    e.preventDefault()
  }

  window.addEventListener('keydown', downHandler, false)
  window.addEventListener('keyup', upHandler, false)
}



export default bindKey