'use strict'

// had some issues with ES6 import, just leave it for now
const PIXI = require('pixi.js')

import {state} from './state'
import {start} from './loop'
import imgs from './imgs'
import bindMouse from './input/mouseListener'
import bindKey from './input/keyListener'
import initDebugger from './debugger'
import initPause from './pause'
import setupMouseIcon from './mouseIcon'

const app = new PIXI.Application(
  state.scene.width,
  state.scene.height,
  {
    antialias: true
  }
)

if (DEBUG) {
  initDebugger(app)
}

document.querySelector('#app').appendChild(app.view)
setupMouseIcon(app) // not working from init -> investigate why

// Load textures
Object.keys(imgs).forEach(key => {
  PIXI.loader.add(imgs[key])
})

PIXI.loader.load(init)


function init() {
  bindMouse(document.querySelector('canvas'))
  bindKey(17, 'ctrl')
  bindKey(32, 'space')
  initPause(app)
  start(app)

  //setTimeout(()=>{app.ticker.stop()}, 5000)
}
