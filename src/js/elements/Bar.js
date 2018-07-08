'use strict'

const PIXI = require('pixi.js')

import Element from './Element'
import {state, elements} from '../state'
import createRectangle from '../createRectangle'

const blurFilter = new PIXI.filters.BlurFilter
blurFilter.blur = 1

class Bar extends Element {

  constructor({x, y, id, color, initialState}, container) {
    super()

    this.id = id
    this.container = container

    this.width = 100
    this.height = 10

    this.el = createRectangle(x, y, this.width, this.height, color)

    const {el} = this

    elements[id] = this

    state[id] = initialState || {
      value: 10000,
      totalValue: 10000
    }

    this.position(x, y)

    el.filters = [blurFilter]

    container.addChild(el)

  }

}


export default Bar