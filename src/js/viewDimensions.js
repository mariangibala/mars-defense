'use strict'

/*
 Resizing game view is a complicated task because all positions and interactions between elements
 have to be recalculated. That's the easy part! The real problem is unpredicted game state.
 If player changes window size from 1920px width to 500px, some random events may fire like hitTest=true.

 One possible solution (almost always used in "IO games") is a design where
 user view is just a "viewport" to a constant sized scene.

 This repo is a quick sideproject for fun, so I've decided to ignore that issue and don't make
 game responsive after initial/onLoad size detection.

 */

function setupDimensions() {

  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
    }
  }

  const maxWidth = 1280
  const maxHeight = 900

  const appWrapper = document.querySelector('#app')

  const clientWidth = appWrapper.clientWidth
  const clientHeight = appWrapper.clientHeight

  const viewWidth = clientWidth <= maxWidth ? clientWidth : maxWidth
  const viewHeight = clientHeight <= maxHeight ? clientHeight : maxHeight

  /*
  Save detected size to ensure rendering scrollbars when windows is resized down
  Initial size is 100vw/100vh and we convert it to pixels.
   */
  appWrapper.style.width = viewWidth + 'px'
  appWrapper.style.height = viewHeight + 'px'

  return {
    width: viewWidth,
    height: viewHeight
  }
}


export default setupDimensions
