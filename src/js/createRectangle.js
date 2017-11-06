'use strict'

const PIXI = require('pixi.js')

function createRectangle(x, y, width, height, color) {

  const rectangle = new PIXI.Graphics()

  rectangle.redraw = function (width, height) {
    rectangle.clear()
    rectangle.beginFill(color)
    rectangle.drawRect(0, 0, width, height)
    rectangle.endFill()
  }

  rectangle.redraw(width, height)

  rectangle.x = x
  rectangle.y = y

  return rectangle
}

export default createRectangle