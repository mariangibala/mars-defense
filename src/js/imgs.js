'use strict'

const imgs = {
  tower: 'src/img/player.png',
  enemy: 'src/img/enemy.png',
  bg: 'src/img/bg.jpg',
  radioactive: 'src/img/bg2.png',
  light: 'src/img/light.png',
  light2: 'src/img/light2.png',
  bullet: 'src/img/bullet.png',
  mouseIcon: 'src/img/mouse.png'
}

Object.keys(imgs).forEach(key => {
  imgs[key] = BASEURL + imgs[key]
})

export default imgs