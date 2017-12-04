'use strict'

import {animateHex} from '../hex'

describe('animation - hex', () => {

  it('interpolates from low to high ', () => {

    const finalColor = 0xFFFFFF
    let currentColor = 0x000000

    for (let x = 0; x < 100; x++) {
      currentColor = animateHex(currentColor, [255, 255, 255], 10)
    }

    assert.equal(currentColor, finalColor)

  })


  it('interpolates from high to low', () => {

    const finalColor = 0x000000
    let currentColor = 0xFFFFFF

    for (let x = 0; x < 100; x++) {
      currentColor = animateHex(currentColor, [0, 0, 0], 10)
    }

    assert.equal(currentColor, finalColor)

  })

  it('interpolates to custom hex', () => {

    const finalColor = 0xF48024 // 244 128 36
    let currentColor = 0xd80b6a

    for (let x = 0; x < 100; x++) {
      currentColor = animateHex(currentColor, [244, 128, 36], 10)
    }

    assert.equal(currentColor, finalColor)

  })

})


