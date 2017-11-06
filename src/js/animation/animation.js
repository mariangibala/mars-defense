'use strict'

import {state, tasks, elements, animationsLoops} from '../state'
import easingFunc from './easing'


const precisionNum = 1000


function animate({id, prop, to, duration, easing = 'linear', callback, createLoop, block, forceUnblock, debug}) {

  const finalValue = to
  const animationId = id + '_' + prop

  if (state.animationsBlocks[animationId] && forceUnblock !== true) {
    return
  }

  // ensure duration is int
  duration = Math.ceil(duration)

  if (block || callback) {
    state.animationsBlocks[animationId] = true
  }

  if (createLoop) {
    if (!animationsLoops[animationId]) {
      animationsLoops[animationId] = createLoop
    } else {
      console.warn('trying to overwrite existing loop for: ', animationId)
      return
    }
  }

  if (!state.animations[id]) {
    state.animations[id] = {}
  }


  // state has higher priority than renderer value
  let currentValue

  if (state[id][prop]) {
    currentValue = state[id][prop]
  } else {
    if (prop === 'scale') {
      currentValue = elements[id].el.scale._x
    } else {
      currentValue = elements[id].el[prop]
    }
  }


  // Internally for float precision calculations use multiplied values
  const _startingValue = currentValue * precisionNum
  const _finalValue = finalValue * precisionNum
  const _diff = Math.abs(_startingValue - _finalValue)


  const totalTime = duration

  // expose animation state
  state.animations[id][prop] = {
    animationId,
    currentValue,
    finalValue,
    currentTime: 0,
    totalTime,
    _startingValue,
    _finalValue,
    _diff,
    easing
  }

  function _animate() {
    const animationState = state.animations[id][prop]

    const factor = easingFunc[easing](animationState.currentTime, totalTime)

    let result
    if (_finalValue > _startingValue) {
      result = _startingValue + _diff * factor
    } else {
      result = _startingValue - _diff * factor
    }

    const currentValue = result / precisionNum
    animationState.currentValue = currentValue
    state[id][prop] = currentValue
    elements[id].syncState()

    if (result === _finalValue || animationState.currentTime === totalTime) {
      tasks.delete(animationId)
      delete state.animations[id][prop]

      if (Object.keys(state.animations[id]).length === 0) {
        delete state.animations[id]
      }

      if (state.animationsBlocks[animationId]) {
        delete state.animationsBlocks[animationId]
      }

      if (callback) {
        callback({animationId})
      } else if (animationsLoops[animationId]) {
        animationsLoops[animationId]({animationId})
      }

      return
    }

    animationState.currentTime++
  }

  tasks.set(animationId, _animate)
}


/*
Creates continuous animation loop
 */

function animateLoop(configFunc) {

  function animation() {
    const config = configFunc()
    animate(config)
  }

  const config = configFunc()
  config.createLoop = animation

  animate(config)

}


export {animate, animateLoop}