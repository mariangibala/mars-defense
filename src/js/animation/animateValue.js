'use strict'

// fix 0.001 precision
const precisionNum = 1000

function animateValue(_current, _next, duration) {

  const current = _current * precisionNum
  let next = _next * precisionNum

  if (Math.abs(next - current) <= 1) {
    return _next
  }

  let step

  if (next > current) {
    step = (next - current) / duration
    next = current + step
  }
  else {
    step = (current - next) / duration
    next = current - step
  }

  return next / precisionNum
}

export {animateValue}
