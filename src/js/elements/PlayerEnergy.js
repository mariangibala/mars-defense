'use strict'

import Bar from './Bar'
import {state} from '../state'


class PlayerEnergy extends Bar {

  constructor({x, y}, container) {
    super({
      x,
      y,
      id: 'playerEnergy',
      color: 0x07f1f3
    }, container)

  }

  onUpdate(s) {
    if (s.value >= s.totalValue) return
    s.value += 2 * state.deltaTime
    this.el.redraw((s.value < 0 ? 0 : s.value / s.totalValue) * this.width, this.height)
  }

}


export default PlayerEnergy