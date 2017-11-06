'use strict'

// Tests if an object is inside the area of another object
function _hitTest(aX, aY, aWidth, aHeight, bX, bY, bWidth, bHeight) {
  if (aX < bX + bWidth && aX + aWidth > bX &&
    aY < bY + bHeight && aY + aHeight > bY) {
    return true
  }
  else {
    return false
  }
}

function hitTest(obj1, obj2) {
  return _hitTest(obj1.x, obj1.y, obj1.width, obj1.height,
    obj2.x, obj2.y, obj2.width, obj2.height)
}


export default hitTest