'use strict'

import setupDimensions from './viewDimensions'
import {getDistance} from './helpers'

const dimensions = setupDimensions()

const state = {
  animations: {},
  animationsBlocks: {},

  timers: {},

  scene: {

    width: dimensions.width,
    height: dimensions.height,
    centerX: dimensions.width / 2,
    centerY: dimensions.height / 2,
    bgX: dimensions.width / 2,
    bgY: dimensions.height / 2,

    bgScale: 1,
    bg2Scale: 1,

    bg2Alpha: 0.2,
    bg2NextAlpha: 0.2,

  },

  key: {
    ctrl: {},
    space: {}
  },

  mouse: {
    x: 0,
    y: 0,
    maxDistanceFromCenter: getDistance(0, 0, dimensions.width / 2, dimensions.height / 2),
    distanceFromCenter: 0,
    distanceFromCenterPercentage: 0,
    isDown: false
  },

  deltaTime: 1,
  elapsedMS: 0,

  level: 0,
  score: 0,

  isBetweenLevels: false,
  scheduledNextWave: false,


  isSlowMotionActive: false,

  // only in DEBUG
  totalTimeByFPS: 0,
  totalTimeByDelta: 0,
  totalTimeByElapsedMS: 0,


}

const defaultState = JSON.parse(JSON.stringify(state))

/*
Pixi elements grouped
*/
const collections = {
  enemy: new Map(),
  tower: new Map(),
  towerBullet: new Map()
}

/*
HashMap ref to native Pixi elements
*/
const elements = {}

/*
Queue of tasks which are called every frame render
*/
const tasks = new Map()

/*
Internal state on animations
 */
const animationsLoops = {}

function resetState() {
  Object.keys(collections).forEach(id => {
    collections[id].clear()
  })

  Object.keys(elements).forEach(key => {

    const element = elements[key]

    // native pixi obj
    // (legacy and should be removed when all elements will be using game element class)
    if (element.destroy) {
      element.destroy()
    }

    // game element class -> nativePixiEl.destroy()
    else if (element.el && element.el.destroy) {
      element.el.destroy()
    }

    delete elements[key]

  })

  const _defaults = JSON.parse(JSON.stringify(defaultState))

  /*
  For the sake of simplicity I have used JS object as a singleton for the game state.
  After module exports we can't just assign a new value to state (state = _defaults),
  That creates a new object but dependent modules still keep reference to the old one.
  So clean it this way:
  */
  Object.keys(state).forEach(key => delete state[key])
  Object.assign(state, _defaults)

  tasks.clear()
  Object.keys(animationsLoops).forEach(key => delete animationsLoops[key])
}

function getNextEnemy() {
  const enemies = collections.enemy.values()

  let enemiesIterator
  let enemy

  do {
    enemiesIterator = enemies.next()
    enemy = enemiesIterator.value
    if (!enemy) break
  } while (state[enemy.id].life < 1 && enemiesIterator.done === false)

  if (enemy) {
    return enemy
  }
}

if (DEBUG) {
  window.elements = elements
  window.tasks = tasks
}

export {
  state,
  elements,
  collections,
  tasks,
  animationsLoops,
  resetState,
  getNextEnemy
}