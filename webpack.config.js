'use strict'

const loadEnvConfig = require('./scripts/loadEnvConfig')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const fs = require('fs')

module.exports = env => {

  const {NODE_ENV, DEBUG, BASEURL} = loadEnvConfig(path.join(__dirname, env.appconfig))

  const envConfig = {
    production: {
      watch: false
    },
    dev: {},
  }

  const webpackConfig = {
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'App.js',
      publicPath: BASEURL
    },
    entry: path.join(__dirname, 'src/js/app.js'),
    devtool: DEBUG ? 'inline-source-map' : false,
    target: 'web',
    watchOptions: {
      poll: 5000
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 8080,
    },
    module: {
      rules: [
        // the 'transform-runtime' plugin tells babel to require the runtime
        // instead of inlining it.
        {
          test: /\.js?$/,
          include: [
            path.resolve(__dirname, 'src/js')
          ],
          loader: 'babel-loader',
        },
      ]
    },
    resolve: {
      modules: [path.join(__dirname, 'src/js'), 'node_modules'],
      extensions: ['.js']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        debugger: DEBUG ? fs.readFileSync(path.join(__dirname, 'src/js/debugger/debugger.html')) : null,
        debuggerCSS: DEBUG ? fs.readFileSync(path.join(__dirname, 'src/js/debugger/debugger.css')) : null
      }),

      new CopyWebpackPlugin([{
        from: path.join(__dirname, 'src/img/*'),
        to: path.join(__dirname, 'dist')
      }], {debug: true}),

      new webpack.DefinePlugin({
        DEBUG: JSON.stringify(DEBUG),
        BASEURL: JSON.stringify(BASEURL),
      }),
    ],

  }

  if (NODE_ENV === 'production') {
    webpackConfig.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }))

    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
      output: {},
      compress: {
        warnings: false
      }
    }))
  }

  return webpackConfig
}
