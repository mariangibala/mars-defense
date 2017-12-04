'use strict'

const easing = {
  easeIn(t, d) {
    if (t > d) return 1
    return Math.pow(t / d, 1.5)
  },

  easeOut(t, d) {
    if (t > d) return 1
    return 1 - Math.pow(1 - (t / d), 1.5)
  },

  linear(t, d) {
    if (t > d) return 1
    return t / d
  }
}

export default easing