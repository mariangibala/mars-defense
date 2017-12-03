'use strict'

import {state} from './state'

function createDragAndDrop(target){

  target.el.interactive = true

  target.el
    .on('mousedown', onDragStart)
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('mousemove', onMove)


  function onDragStart(e){
    state[target.id].isDragging = true
    this.alpha = 0.5
    this.scale.set(1.2)
    this.tint = 0xFF0000
  }

  function onDragEnd(e){
    state[target.id].isDragging = false
    this.alpha = 1
    this.scale.set(1)
    this.tint = 0xFFFFFF
  }

  function onMove(e){
    const el = state[target.id]

    if(el.isDragging === true){
      el.x += e.data.originalEvent.movementX
      el.y += e.data.originalEvent.movementY
    }
  }

}

module.exports = createDragAndDrop
