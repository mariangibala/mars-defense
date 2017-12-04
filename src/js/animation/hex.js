'use strict'

import {animateValue} from './animateValue'

function animateChannel(currentValue, nextValue, duration) {

  let round
  if (nextValue < currentValue ){
    round = Math.floor
  } else {
    round = Math.ceil
  }

  let result = round(animateValue(currentValue, nextValue, duration))

  if (result > 255) {
    result = 255
  } else if (result < 0){
    result = 0
  }

  return result
}

function componentToHex(c) {
  const hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

/*
@param {Number} hex 0x000000
 */
function hexToRgb(hex) {
  const r = (hex >> 16) & 255
  const g = (hex >> 8) & 255
  const b = hex & 255

  return {r, g, b}
}

/*
Array [r,g,b] is used because it should be cached to avoid conversion between frames
@param {Number} startingHexColor 0x000000
@param {Array} finalRGB
 */
function animateHex(startingHexColor, finalRGB, duration) {

  const {r, g, b} = hexToRgb(startingHexColor)

  let _r = animateChannel(r, finalRGB[0], duration)
  let _g = animateChannel(g, finalRGB[1], duration)
  let _b = animateChannel(b, finalRGB[2], duration)

  _r = componentToHex(_r)
  _g = componentToHex(_g)
  _b =componentToHex(_b)

  const result = parseInt(_r + _g + _b, 16)

  return result
}



export {animateHex}