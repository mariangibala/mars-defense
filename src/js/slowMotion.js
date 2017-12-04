'use strict'

import {state} from './state'

function checkSlowMotion(app) {

  if ((state.isSlowMotionActive && state.key.space.isDown && state.playerEnergy.value > 0) ||
    state.key.space.isDown && state.playerEnergy.value > 5000){

    if (!state.isSlowMotionActive){
      state.isSlowMotionActive = true
      app.ticker.speed = 0.5
    }

    state.playerEnergy.value -= 20 * state.deltaTime

  } else if (state.isSlowMotionActive === true && (!state.key.space.isDown
      || state.playerEnergy.value <= 0))  {

    state.isSlowMotionActive = false
    app.ticker.speed = 1
  }

}

export default checkSlowMotion