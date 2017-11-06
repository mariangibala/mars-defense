'use strict'

import {state} from '../state'

function mouseDown(e) {
  state.mouse.isDown = true
}

function mouseUp(e) {
  state.mouse.isDown = false
}

function mouseClick(e) {
  state.mouse.x = e.offsetX
}

function mouseMove(e) {
  state.mouse.x = e.offsetX
  state.mouse.y = e.offsetY
}


function bindMouse(DOMelement) {
  DOMelement.addEventListener("click", mouseClick)
  DOMelement.addEventListener("mousedown", mouseDown)
  DOMelement.addEventListener("mouseup", mouseUp)
  DOMelement.addEventListener("mousemove", mouseMove)
}


export default bindMouse