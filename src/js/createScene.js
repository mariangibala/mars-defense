'use strict'

const PIXI = require('pixi.js')

import {state, elements} from './state'
import Tower from './elements/Tower'
import createRectangle from './createRectangle'
import {createBG} from './bg'
import {createLight} from './light'
import Element from './elements/Element'
import PlayerLife from './elements/PlayerLife'
import PlayerEnergy from './elements/PlayerEnergy'
import PlayerAmmo from './elements/PlayerAmmo'
import {animateLoop} from './animation'
import {getRandomDecimalBetween, getRandomIntBetween} from './helpers'


function createScene(app) {

  createBG(app)

  const container = new PIXI.Container()
  app.stage.addChild(container)


  let x = 1
  while (x) {
    new Tower({
      x: Math.round(state.scene.width / 2),
      y: Math.round(state.scene.height / 2)
    }, container)
    x--
  }


  createLight(app)


  // Tint

  const sceneTint = new Element(createRectangle(0, 0, state.scene.width, state.scene.height, 0xff0000),
    'sceneTint', app.stage)

  sceneTint.el.alpha = 0
  sceneTint.el.blendMode = PIXI.BLEND_MODES.MULTIPLY


  animateLoop(() => {
    return {
      id: 'sceneTint',
      prop: 'alpha',
      to: getRandomDecimalBetween(0, 0.3),
      duration: getRandomIntBetween(60, 60 * 4)
    }
  })



  new PlayerLife({x: 15, y: state.scene.height - 25}, app.stage)
  new PlayerEnergy({x: 15, y: state.scene.height - 40}, app.stage)
  new PlayerAmmo({x: 15, y: state.scene.height - 55}, app.stage)


  const defaultTextStyle = {fontFamily: 'Arial', fontSize: 14, fill: 'white'}

  if (DEBUG){
    // debug info
    elements.debug = new PIXI.Text('debuggerPlaceholder', defaultTextStyle)
    elements.debug.position.set(15, 75)
    app.stage.addChild(elements.debug)
  }

  // level
  elements.levelInfo = new PIXI.Text('LEVEL', defaultTextStyle)
  elements.levelInfo.position.set(15, 15)
  app.stage.addChild(elements.levelInfo)

  // score
  elements.scoreInfo = new PIXI.Text('SCORE', defaultTextStyle)
  elements.scoreInfo.position.set(15, 45)
  app.stage.addChild(elements.scoreInfo)


  return container

}

export default createScene