'use strict'

const PIXI = require('pixi.js')

import {state, elements} from './state'
import {getRandomDecimalBetween, getRandomIntBetween} from './helpers'
import imgs from './imgs'
import {centerElToScene} from './entityHelpers'
import {animateLoop, animateValue} from './animation'
import Element from './elements/Element'

function createLight(app) {

  const light1 = new Element(PIXI.Sprite.fromImage(imgs.light2), 'light1', app.stage)
  centerElToScene(light1.el)
  light1.el.blendMode = PIXI.BLEND_MODES.SCREEN

  const light2 = new Element(PIXI.Sprite.fromImage(imgs.light), 'light2', app.stage)
  centerElToScene(light2.el)
  light2.el.blendMode = PIXI.BLEND_MODES.ADD
  light2.el.alpha = 0.3
  light2.el.tint = 0xff0000


  animateLoop(() => {
    return {
      id: 'light1',
      prop: 'alpha',
      to: getRandomDecimalBetween(0.3, 0.7),
      duration: getRandomIntBetween(40, 60 * 4)
    }
  })


}

function updateLight() {

  elements.light1.el.scale.set(state.scene.currentScale, state.scene.currentScale)
  elements.light1.el.x = state.scene.bgX
  elements.light1.el.y = state.scene.bgY

}

export {
  updateLight,
  createLight
}