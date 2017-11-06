'use strict'

import {state} from '../../state'
import * as entityHelpers from '../../entityHelpers'
import {chance, getDistance} from '../../helpers'
import {animate} from '../../animation'


function nextMove(id) {
  const s = state[id]

  let position

  // todo implement more sophisticated AI :))


  let probability   // of player attack
  if (s.movesCounter < 1){
    probability = 0
  } else {
    probability = 50 + s.movesCounter
  }


  const shouldAttack = chance(probability)

  if (s.nextDestination) {
    position = s.nextDestination
    delete s.nextDestination
  } else if (shouldAttack) {
    position = {x: state.scene.centerX, y: state.scene.centerY}
  } else {
    position = entityHelpers.getRandomPosition(id)
  }

  const duration = getDistance(s.x, s.y, position.x, position.y) / s.speed

  animate({
    id,
    prop: 'x',
    to: position.x,
    duration: duration,
    easing: 'easeOut',
    debug: true,
    callback: function () {
      nextMove(id)
    }
  })

  animate({
    id,
    prop: 'y',
    to: position.y,
    easing: 'easeOut',
    duration: duration,
  })

  s.movesCounter++

}


export default nextMove