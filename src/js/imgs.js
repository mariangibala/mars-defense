'use strict'

const imgs = {
  tower: 'src/img/m2.png',
  enemy: 'src/img/m.png',
  bg: 'src/img/bg.jpg',
  radioactive: 'src/img/bg2.png',
  light: 'src/img/light.png',
  light2: 'src/img/light2.png',
  bullet: 'src/img/bullet.png'
}

Object.keys(imgs).forEach(key => {
  imgs[key] = BASEURL + imgs[key]
})

export default imgs