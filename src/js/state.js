'use strict'

import {viewHeight, viewWidth} from './viewDimensions'
import {getDistance} from './helpers'

let state = {
  animations: {},
  animationsBlocks:{},

  scene: {

    width: viewWidth,
    height: viewHeight,
    centerX: viewWidth / 2,
    centerY: viewHeight / 2,
    bgX: viewWidth / 2,
    bgY: viewHeight / 2,

    bgScale: 1,
    bg2Scale: 1,

    bg2alpha: 0.2,
    bg2nextalpha: 0.2,

  },

  key: {
    ctrl: {}
  },

  mouse: {
    x: 0,
    y: 0,
    maxDistanceFromCenter: getDistance(0, 0, viewWidth / 2, viewHeight / 2),
    distanceFromCenter: 0,
    distanceFromCenterPercentage: 0,
    isDown: false
  },

  count: 0,
  level: 0,
  isBetweenLevels: false,
  nextWave: 0,
  score: 0,
}

const defaultState = JSON.parse(JSON.stringify(state))

let elements = {
  enemy: new Map(),
  tower: new Map(),
  towerBullet: new Map()
}

let tasks = new Map()
let animationsLoops = {}

function resetState() {
  Object.keys(elements).forEach(key => {

    const i = elements[key]

    // direct pixi obj (legacy should be removed soon as all el should be using element class)
    if (i.destroy) {
      i.destroy()
      delete elements[key]
    }

    else if (i.el && i.el.destroy){
      i.el.destroy()
      delete elements[key]
    }

    else if (i.clear){
      i.clear()
    }

  })

  const _defaults = JSON.parse(JSON.stringify(defaultState))

  Object.keys(state).forEach(key => delete state[key])
  Object.keys(_defaults).forEach(key => state[key] = _defaults[key])

  tasks.clear()
  Object.keys(animationsLoops).forEach(key => delete animationsLoops[key])
}

function getNextEnemy(){
  const enemies = elements.enemy.values()

  let enemiesIterator
  let enemy

  do {
    enemiesIterator = enemies.next()
    enemy = enemiesIterator.value
    if (!enemy) break
  } while ((state[enemy.id].life < 1) && enemiesIterator.done === false)

  if (enemy){
    return enemy
  }
}

window.elements = elements
window.tasks = tasks

export {
  state,
  elements,
  tasks,
  animationsLoops,
  resetState,
  getNextEnemy
}