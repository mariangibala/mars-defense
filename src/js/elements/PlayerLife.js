'use strict'

const PIXI = require('pixi.js')

import Element from './Element'
import {state, elements} from '../state'
import createRectangle from '../createRectangle'

const blurFilter = new PIXI.filters.BlurFilter
blurFilter.blur = 1

class PlayerLife extends Element {

  constructor({x, y}, container) {
    super()

    this.container = container
    this.id = 'playerLife'

    this.width = 100
    this.height = 10

    this.el = createRectangle(x, y, this.width, this.height, 0x00ff00)

    const {id, el} = this


    elements[id] = this

    state[id] = {
      life: 1000,
      totalLife: 1000
    }

    this.position(x, y)

    el.filters = [blurFilter]

    container.addChild(el)

  }

  onUpdate() {
    const s = state[this.id]
    if (s.life === s.totalLife) return
    s.life++
    this.el.redraw((s.life < 0 ? 0 : s.life / s.totalLife) * this.width, this.height)
  }

}


export default PlayerLife