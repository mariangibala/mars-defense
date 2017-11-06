'use strict'

const easing = {
  easeIn(t, d) {
    return Math.pow(t / d, 1.5)
  },

  easeOut(t, d) {
    return 1 - Math.pow(1 - (t / d), 1.5)
  },

  linear(t, d) {
    return t / d
  }
}

export default easing