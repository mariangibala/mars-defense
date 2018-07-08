'use strict'

import imgs from './imgs'

const mouseIcon = `url('${imgs.mouseIcon}') 32 32,auto`

function setupMouseIcon(app) {
  app.renderer.plugins.interaction.cursorStyles.default = mouseIcon
  app.renderer.plugins.interaction.cursorStyles.hover = mouseIcon
}

export default setupMouseIcon