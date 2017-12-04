'use strict'

import {state, tasks} from './state'

let id = 0

function generateId() {
  id++
  return 'timer-' + id
}

function setTimer(callback, time, _id) {
  const id = _id || generateId()

  state.timers[id] = time

  function updateTimer () {
    state.timers[id] -= state.elapsedMS
    if (state.timers[id] <= 0){
      delete state.timers[id]
      callback()
      tasks.delete(id)
    }
  }

  tasks.set(id, updateTimer)
}

function cancelTimer(id){
  delete state.timers[id]
  tasks.delete(id)
}


export  {
  setTimer,
  cancelTimer
}