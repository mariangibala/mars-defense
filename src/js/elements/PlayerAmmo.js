'use strict'

const PIXI = require('pixi.js')

import Element from './Element'
import {state, elements} from '../state'
import createRectangle from '../createRectangle'

const blurFilter = new PIXI.filters.BlurFilter
blurFilter.blur = 1

class PlayerAmmo extends Element {

  constructor({x, y}, container) {
    super()

    this.container = container
    this.id = 'playerAmmo'

    this.width = 100
    this.height = 10

    this.el = createRectangle(x, y, this.width, this.height, 0xff0000)

    const {id, el} = this


    elements[id] = this

    state[id] = {
      value: 10000,
      totalValue: 10000
    }

    this.position(x, y)

    el.filters = [blurFilter]

    container.addChild(el)

  }

  onUpdate() {
    const s = state[this.id]
    if (s.value >= s.totalValue) return
    s.value += 30 * state.deltaTime
    this.el.redraw((s.value < 0 ? 0 : s.value / s.totalValue) * this.width, this.height)
  }

}


export default PlayerAmmo