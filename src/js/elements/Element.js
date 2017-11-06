'use strict'

import {state, elements, animationsLoops, tasks} from '../state'

let id = 1  // internal id counter for elements

function getId() {
  id++
  return 'id_' + id
}

const syncStateProps = [
  'x', 'y', 'alpha', 'rotation', 'scale'
]

class Element {
  constructor(el, id, container) {
    this.id = id || getId()

    if (el) {
      this.el = el

      elements[this.id] = this
      state[this.id] = {}

      if (container) {
        container.addChild(el)
      }
    }

  }

  /*
  get from state values required to render pixi element
   */
  syncState() {
    syncStateProps.forEach(key => {
      if (typeof state[this.id][key] !== 'undefined') {

        if (key === 'scale') {
          this.el.scale.set(state[this.id].scale, state[this.id].scale)
        } else {
          this.el[key] = state[this.id][key]
        }


      }
    })

  }

  kill() {
    this.__killed = true
  }

  __kill() {
    if (this.type) {
      elements[this.type].delete(this.id)
    }

    delete elements[this.id]


    state[this.id] = null
    delete state[this.id]

    this.el.destroy()
    this.stopAnimations()

  }

  stopAnimations() {
    if (state.animations[this.id]) {
      const elAnimations = state.animations[this.id]

      Object.keys(elAnimations).forEach(key => {
        const id = elAnimations[key].animationId


        if (typeof state.animationsBlocks[id] !== 'undefined') {
          delete state.animationsBlocks[id]
        }

        if (animationsLoops[id]) {
          delete state.animationsBlocks[id]
        }

        if (tasks.get(id)) {
          tasks.delete(id)
        }

        delete elAnimations[key]

      })

      delete state.animations[this.id]
    }
  }

  update() {
    this.onUpdate()

    if (this.__killed) {
      this.__kill()
    } else {
      this.syncState()
    }
  }


  position(x = 0, y = 0) {
    let position = {x, y}
    Object.assign(state[this.id], position)
  }


}

export default Element