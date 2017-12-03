'use strict'

const PIXI = require('pixi.js')

import Element from './Element'
import {state, elements, collections} from '../state'
import imgs from '../imgs'


class Bullet extends Element {
  constructor({x, y, vx, vy, collectionId}, container) {
    super()

    this.el = new PIXI.Sprite(PIXI.loader.resources[imgs.bullet].texture)
    this.collectionId = collectionId

    const {id, el} = this

    state[id] = {
      totalLife: 60,
      life: 60,
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      alpha: 1,
    }

    el.anchor.x = 0.5
    el.anchor.y = 0.5

    el.scale.set(1.5, 1.5)

    container.addChild(el)
    collections[collectionId].set(id, this)
    elements[id] = this

  }


  onUpdate() {

    const s = state[this.id]

    s.life--

    s.alpha = s.life / s.totalLife + 0.3

    if (s.life < 1) {
      this.kill()
      return
    }

    s.x += s.vx
    s.y += s.vy

  }

}

export default Bullet