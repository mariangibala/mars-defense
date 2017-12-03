'use strict'

const PIXI = require('pixi.js')

import Element from '../Element'
import {state, elements, getNextEnemy, collections} from '../../state'
import createRectangle from '../../createRectangle'
import imgs from '../../imgs'
import movement from './movement'
import {getRandomIntBetween} from '../../helpers'

const positions = [
  {x: 50, y: 50},
  {x: state.scene.width - 50, y: 50},
  {x: 50, y: state.scene.height - 50},
  {x: state.scene.width - 50, y: state.scene.height - 50},
]

function getStartingPosition() {
  return positions[getRandomIntBetween(0, 3)]
}

class Enemy extends Element {
  constructor({x, y, destination}, container) {
    super()

    this.el = new PIXI.Container()

    const {id, el} = this

    el.interactive = true

    const enemyImg = new PIXI.Sprite(PIXI.loader.resources[imgs.enemy].texture)

    enemyImg.anchor.x = 0.5
    enemyImg.anchor.y = 0.5


    const light = new PIXI.Sprite(PIXI.loader.resources[imgs.enemy].texture)

    light.anchor.x = 0.5
    light.anchor.y = 0.5

    const sizeW = enemyImg.width
    const sizeH = enemyImg.height

    const startingPosition = getStartingPosition()

    state[id] = {
      life: 100,
      totalLife: 100,
      scoreValue: 100,
      movesCounter: 0,
      speed: 1.5 + state.level * 0.15,
      widthgm: sizeW,
      heightgm: sizeH,
      maxX: state.scene.width - sizeW,
      maxY: state.scene.height - sizeH,
      ...startingPosition
    }

    if (destination) this.setNextDestination(destination)

    this.life = createRectangle(0 - sizeW / 4, -sizeH / 2 - 5, sizeW / 2, this.lifeHeight, 0xffffff)
    this.life.alpha = 0.5

    enemyImg.tint = 0xffffff
    enemyImg.interactive = true

    light.blendMode = PIXI.BLEND_MODES.ADD
    light.scale.set(1.5, 1.5)
    light.tint = 0xff0000

    el.addChild(this.life)
    el.addChild(light)
    el.addChild(enemyImg)


    container.addChild(el)
    collections.enemy.set(id, this)
    elements[id] = this

    movement(id)

  }

  setNextDestination (destination) {
    state[this.id].nextDestination = destination
  }

  onUpdate() {

    const s = state[this.id]

    if (s.life < 1) {
      this.kill()


      // make sure that at least one enemy is targeting player
      const nextEnemy = getNextEnemy()
      if (nextEnemy) nextEnemy.setNextDestination({
        x: state.scene.centerX,
        y: state.scene.centerY
      })

      return
    }

    this.life.redraw((s.life / s.totalLife) * s.widthgm / 2, this.lifeHeight)

  }

}

Enemy.prototype.collectionId = 'enemy'
Enemy.prototype.lifeHeight = 2

export default Enemy