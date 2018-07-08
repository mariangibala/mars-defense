'use strict'

import Bar from './Bar'
import {state} from '../state'

class PlayerLife extends Bar {

  constructor({x, y}, container) {
    super({
      x,
      y,
      id: 'playerLife',
      color: 0x00ff00,
      initialState: {
        life: 1000,
        totalLife: 1000
      }
    }, container)

  }

  onUpdate(s) {
    if (s.life >= s.totalLife) return
    s.life += state.deltaTime
    this.el.redraw((s.life < 0 ? 0 : s.life / s.totalLife) * this.width, this.height)
  }

}


export default PlayerLife