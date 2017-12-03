'use strict'

const PIXI = require('pixi.js')

import Element from './Element'
import Bullet from './Bullet'
import {state, elements, collections} from '../state'
import imgs from '../imgs'
import {rotateToPoint, setVector, getRandomIntBetween} from '../helpers'

class Tower extends Element {

  constructor({x, y}, container) {
    super()

    this.container = container

    this.el = new PIXI.Sprite(PIXI.loader.resources[imgs.tower].texture)

    const {id, el} = this

    el.anchor.x = 0.5
    el.anchor.y = 0.5


    const shotRate = 5

    state[id] = {
      life: 100,
      shotRate,
      accuracy: 5,
      nextShot: shotRate,
    }

    this.position(x, y)

    //createDragAndDrop(el, state)

    container.addChild(el)
    collections.tower.set(id, this)
    elements[id] = this

  }

  onUpdate() {

    const s = state[this.id]

    if ((state.mouse.isDown || state.key.ctrl.isDown) && s.isDragging !== true) {

      if (s.nextShot > 0) {
        s.nextShot--
      } else {
        const vector = setVector(
          getRandomIntBetween(state.mouse.x - s.accuracy, state.mouse.x + s.accuracy),
          getRandomIntBetween(state.mouse.y - s.accuracy, state.mouse.y + s.accuracy),
          s.x, s.y)

        // move starting point of animation a little but outside img sprite
        const bulletX = s.x + vector.x * 3
        const bulletY = s.y + vector.y * 3

        new Bullet({x: bulletX, y: bulletY, vx: vector.x, vy: vector.y, collectionId: 'towerBullet'}, this.container)
        s.nextShot = s.shotRate
      }

    }

    s.rotation = rotateToPoint(state.mouse.x, state.mouse.y, s.x, s.y)

  }

}

Tower.prototype.collectionId = 'tower'

export default Tower