'use strict'

function loadConfig(configPath){
  let config
  console.log('Loading build config: ', configPath)

  try {
    config = require(configPath)
  } catch (err){
    if (err || !config){
      console.log('Error: Can\'t load config')
      console.error(err)
      process.exit()
    }
  }

  console.log('Config loaded!')
  return config
}

module.exports = loadConfig