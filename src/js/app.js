'use strict'

const PIXI = require('pixi.js')

import {state, tasks, defaultTasks} from './state'
import {start} from  './loop'
import imgs from './imgs'
import bindMouse from './input/mouseListener'
import bindKey from './input/keyListener'
import initDebugger from './debugger'


const app = new PIXI.Application(
  state.scene.width,
  state.scene.height,
  {
    antialias: true
  }
)

document.querySelector('#app').appendChild(app.view)
initDebugger(app)


// Load textures
Object.keys(imgs).forEach(key => {
  PIXI.loader.add(imgs[key])
})

PIXI.loader.load(init)


function init() {
  bindMouse(document.querySelector('canvas'))
  bindKey(17, 'ctrl')
  start(null, app)
}
