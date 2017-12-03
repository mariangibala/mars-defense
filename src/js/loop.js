'use strict'

const PIXI = require('pixi.js')

import {state, elements, resetState, tasks, animationsLoops, collections} from './state'
import hitTest from './hitTest'
import {getDistance} from './helpers'
import {updateBG} from './bg'
import {updateLight} from './light'
import Enemy from './elements/Enemy'
import Element from './elements/Element'
import createScene from './createScene'
import applyScaleEffect from './scaleEffect'
import {animate} from './animation'


/*
@param {Pixi Application} app
@param {Function} func in current pixi ticker to be removed.
 */
function start(app, func) {

  if (func) app.ticker.remove(func)

  resetState()

  const container = createScene(app)

  const loopInstance = function (delta) {
    loop(delta, {app, container}, loopInstance)
  }

  app.ticker.add(loopInstance)
  if (!app.ticker.started) app.ticker.start()

}


function endGameLoop(delta, app, thisLoop) {
  tasks.forEach(func => func())
}


function loop(delta, {app, container}, loopInstance) {

  state.count++

  if (state.count === 121) {
    state.count = 0
  }

  // Update some globals
  state.mouse.distanceFromCenter = Math.round(getDistance(
    state.mouse.x, state.mouse.y,
    state.scene.centerX, state.scene.centerY
  ))

  state.mouse.distanceFromCenterPercentage = Math.round(
    state.mouse.distanceFromCenter / state.mouse.maxDistanceFromCenter * 100)

  if (DEBUG) {
    elements.debug.text = state.count
  }

  updateBG()
  updateLight()

  collections.enemy.forEach(i => i.update())
  collections.tower.forEach(i => i.update())
  collections.towerBullet.forEach(i => i.update())


  collections.enemy.forEach(enemy => {

    const enemyBounds = enemy.el.getBounds()

    collections.towerBullet.forEach(bullet => {

      const bulletBounds = bullet.el.getBounds()

      const isHit = hitTest(bulletBounds, enemyBounds)

      const enemyState = state[enemy.id]

      if (isHit) {
        enemyState.life -= 30
        state[bullet.id].life = 0

        if (enemyState.life <= 0) {
          state.score += enemyState.scoreValue
        }

      }

    })

  })


  collections.enemy.forEach(enemy => {
    if (!state[enemy.id].life) return

    const enemyBounds = enemy.el.getBounds()
    const center = {x: state.scene.centerX - 10, y: state.scene.centerY - 10, width: 5, height: 5}

    const isHit = hitTest(enemyBounds, center)

    if (isHit) {
      state.playerLife.life -= 100
      state[enemy.id].life = 0

      // 0.3-0.6
      const tintVal = 1 - (0.4 + (state.playerLife.life / state.playerLife.totalLife) * 0.3)

      animate({
        id: 'sceneTint',
        prop: 'alpha',
        to: tintVal,
        duration: 10,
        easing: 'easeOut',
        block: true
      })

    }

  })


  if (state.isBetweenLevels === false && collections.enemy.size < 1) {
    state.isBetweenLevels = true
    setTimeout(() => {
      let y = Math.round(state.level * 1.3) + 5
      while (y) {

        // ensure that at least 2 enemies are targeting player
        let destination
        if (y <= 2) {
          destination = {x: state.scene.centerX, y: state.scene.centerY}
        }

        new Enemy({destination}, container)
        y--
      }
      state.isBetweenLevels = false
    }, state.nextWave)

    state.nextWave = 3000
    state.level++
    elements.levelInfo.text = 'LEVEL ' + state.level
  }


  elements.playerLife.update()

  if (state.playerLife.life <= 0) {

    elements.levelInfo.text = 'GAME OVER'

    collections.enemy.forEach(el => el.stopAnimations())

    const endLoopContainer = function (delta) {
      endGameLoop(delta, app, endLoopContainer)
    }

    const playBtn = new Element(new PIXI.Text('Play Again', {
      fontFamily: 'Arial',
      fontSize: 26,
      fill: ['#ffffff', '#f1f1f1', '#FFFFFF'],
      fontWeight: 'bold',
      dropShadow: true,
      dropShadowAlpha: 1,
      dropShadowBlur: 5,
      dropShadowColor: '#ff0000',
      dropShadowDistance: 0,
      stroke: 'red',
    }), 'playBtn', app.stage)

    playBtn.el.anchor.set(0.5, 0.5)
    playBtn.el.position.set(state.scene.centerX, state.scene.height - 100)
    playBtn.el.interactive = true
    playBtn.el.buttonMode = true

    applyScaleEffect(playBtn)

    playBtn.el.on('click', start.bind(null, app, endLoopContainer))

    animate({
      id: 'sceneTint',
      prop: 'alpha',
      to: 0.8,
      duration: 30,
      callback: function ({animationId}) {
        delete animationsLoops[animationId]
      },
      forceUnblock: true
    })

    app.ticker.add(endLoopContainer)
    app.ticker.remove(loopInstance)

  }

  elements.scoreInfo.text = 'SCORE ' + state.score

  tasks.forEach(func => func())

}


export {
  start
}