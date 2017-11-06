'use strict'

const PIXI = require('pixi.js')

import {state, elements} from './state'
import {getRandomDecimalBetween, getRandomIntBetween} from './helpers'
import imgs from './imgs'
import {centerElToScene} from './entityHelpers'
import {animateLoop, animateValue} from './animation'
import Element from './elements/Element'

function createBG(app) {

  const bgs = [
    {
      id: 'bg',
      img: imgs.bg
    },
    {
      id: 'bg2',
      img: imgs.bg,
      tint: 0xffff00,
      blendMode: PIXI.BLEND_MODES.SCREEN
    }, {
      id: 'bg3',
      img: imgs.radioactive,
      blendMode: PIXI.BLEND_MODES.ADD,
      alpha: 0.2
    }]

  const props = ['tint', 'blendMode', 'alpha']

  bgs.forEach(el => {
    const bg = new Element(PIXI.Sprite.fromImage(el.img), el.id, app.stage)

    centerElToScene(bg.el)

    props.forEach(key => {
      if (typeof el[key] !== 'undefined') bg.el[key] = el[key]
    })

  })


  animateLoop(() => {
    return {
      id: 'bg3',
      prop: 'alpha',
      to: getRandomDecimalBetween(0, 0.6),
      duration: getRandomIntBetween(40, 60 * 4)
    }
  })


}


const bgMovementRange = 50

function updateBG() {
  const scale = 1 - 0.1 * state.mouse.distanceFromCenterPercentage / 100
  state.scene.bgScale = animateValue(state.scene.bgScale, scale, 40)

  elements.bg.el.scale.set(state.scene.bgScale, state.scene.bgScale)

  state.scene.rangeX = (state.mouse.x - state.scene.centerX) / state.scene.centerX * bgMovementRange
  const xPosition = state.scene.centerX - state.scene.rangeX
  state.scene.bgX = animateValue(state.scene.bgX, xPosition, 80)

  state.scene.rangeY = (state.mouse.y - state.scene.centerY) / state.scene.centerY * bgMovementRange
  const yPosition = state.scene.centerY - state.scene.rangeY
  state.scene.bgY = animateValue(state.scene.bgY, yPosition, 80)

  elements.bg.el.x = state.scene.bgX
  elements.bg.el.y = state.scene.bgY


  // BG2
  const scale2 = 1 - 0.11 * state.mouse.distanceFromCenterPercentage / 100
  state.scene.bg2Scale = animateValue(state.scene.bg2Scale, scale2, 40)
  elements.bg2.el.scale.set(state.scene.bg2Scale, state.scene.bg2Scale)

  elements.bg2.el.x = state.scene.bgX
  elements.bg2.el.y = state.scene.bgY

  state.scene.bg2nextalpha = state.mouse.distanceFromCenterPercentage / 100
  state.scene.bg2alpha = animateValue(state.scene.bg2alpha, state.scene.bg2nextalpha, 40)
  elements.bg2.alpha = state.scene.bg2alpha


  // BG3 - radioactive
  elements.bg3.el.scale.set(state.scene.bgScale, state.scene.bgScale)
  elements.bg3.el.x = state.scene.bgX
  elements.bg3.el.y = state.scene.bgY


}

export {
  updateBG,
  createBG
}