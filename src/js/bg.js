'use strict'

const PIXI = require('pixi.js')

import {state, elements} from './state'
import {getRandomDecimalBetween, getRandomIntBetween} from './helpers'
import imgs from './imgs'
import {centerElToScene} from './entityHelpers'
import {animateLoop, animateValue, animateHex} from './animation'
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
    },

  ]

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

const slowMotionTintA = [0,0,255]
const noSlowMotionTintA = [255,255,255]

const slowMotionTintB = [0,0,255]
const noSlowMotionTintB = [255,255,0]

const slowMotionTintC = [0,255,255]
const noSlowMotionTintC = [255,255,255]

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

  state.scene.bg2NextAlpha = state.mouse.distanceFromCenterPercentage / 100
  state.scene.bg2Alpha = animateValue(state.scene.bg2Alpha, state.scene.bg2NextAlpha, 40)
  elements.bg2.alpha = state.scene.bg2Alpha


  // BG3 - radioactive
  elements.bg3.el.scale.set(state.scene.bgScale, state.scene.bgScale)
  elements.bg3.el.x = state.scene.bgX
  elements.bg3.el.y = state.scene.bgY


  if (state.isSlowMotionActive || elements.bg.el.tint !== 0xffffff ){
    elements.bg.el.tint = animateHex(elements.bg.el.tint, state.isSlowMotionActive ?
      slowMotionTintA : noSlowMotionTintA, 10)

    elements.bg2.el.tint = animateHex(elements.bg2.el.tint, state.isSlowMotionActive ?
      slowMotionTintB : noSlowMotionTintB, 10)

    elements.bg3.el.tint = animateHex(elements.bg3.el.tint, state.isSlowMotionActive ?
      slowMotionTintC : noSlowMotionTintC, 10)
  }

}

export {
  updateBG,
  createBG
}