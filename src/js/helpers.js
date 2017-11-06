'use strict'

function getRandomIntBetween (a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function getRandomDecimalBetween (a, b) {
  b = b * 100
  a = a * 100

  const randomNumber = getRandomIntBetween(a, b)

  return randomNumber / 100
}

function rotateToPoint(targetX, targetY, centerX, centerY) {
  const dist_X = targetX - centerX
  const dist_Y = targetY - centerY
  const radians = Math.atan2(dist_Y, dist_X)
  //const angle = radians * (180/Math.PI)
  return radians
}

function setVector(targetX, targetY, centerX, centerY, speed = 10) {
  const dist_X = targetX - centerX
  const dist_Y = targetY - centerY

  const dv = Math.sqrt(Math.pow(dist_X, 2) + Math.pow(dist_Y, 2))

  const x = dist_X / dv * speed
  const y = dist_Y / dv * speed

  return {x,y}
}

function getDistance (x1, y1, x2, y2) {
  const difX = Math.round(Math.abs(x1 - x2))
  const difY = Math.round(Math.abs(y1 - y2))

  return Math.round(Math.sqrt((difX * difX) + (difY * difY)))
}

function chance(x){
  return getRandomIntBetween(0, 100) < x
}


export {
  getRandomIntBetween,
  getRandomDecimalBetween,
  setVector,
  rotateToPoint,
  getDistance,
  chance
}