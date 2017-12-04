'use strict'

import easing from '../easing'

describe('Easing', () => {

  it('handles correctly current time > duration ', () => {

    const result = easing.easeOut(197, 196)
    assert.equal(1, result)

  })

})


