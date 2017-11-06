'use strict'

import {animate} from './animation'

function applyScaleEffect(target){

  target.el.interactive = true

  target.el
    .on("mouseover", hoverOn)
    .on('mouseout', hoverOut)


  function hoverOn(e){
    animate({
      id: target.id,
      prop: 'scale',
      to: 1.2,
      duration: 20,
      easing: 'easeOut'
    })
  }

  function hoverOut(e){
    animate({
      id: target.id,
      prop: 'scale',
      to: 1,
      duration: 20,
      easing: 'easeOut'
    })
  }

}

export default applyScaleEffect
