'use strict'

import {getRandomIntBetween} from './helpers'
import {state} from './state'


function getRandomPosition(id) {
  const el = state[id]
  const x = getRandomIntBetween(0, el.maxX || state.scene.width)
  const y = getRandomIntBetween(0, el.maxY || state.scene.height)

  return {x, y}
}

function centerElToScene(el){
  el.anchor.set(0.5, 0.5)
  el.scale.set(1, 1)

  el.x = state.scene.centerX
  el.y = state.scene.centerY
}

export {
  getRandomPosition,
  centerElToScene
}