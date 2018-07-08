'use strict'

import Bar from './Bar'
import {state} from '../state'

class PlayerAmmo extends Bar {

  constructor({x, y}, container) {
    super({
      x,
      y,
      id: 'playerAmmo',
      color: 0xff0000
    }, container)

  }

  onUpdate(s) {
    if (s.value >= s.totalValue) return
    s.value += 30 * state.deltaTime
    this.el.redraw((s.value < 0 ? 0 : s.value / s.totalValue) * this.width, this.height)
  }

}


export default PlayerAmmo