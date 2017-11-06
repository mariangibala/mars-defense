const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV || 'dev'
const _DEBUG_ = NODE_ENV === 'dev'

const BASEURL = NODE_ENV === 'production' ? '' : '/'

const envConfig = {
  production: {
    watch: false
  },
  dev: {

  },
}

const webpackConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'App.js',
    publicPath: BASEURL
  },
  entry: path.join(__dirname, 'src/js/app.js'),
  devtool: '',
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
        options: {
          presets: [['env', { modules: false }]],
          plugins: [
            'transform-runtime',
            'syntax-dynamic-import',
            'transform-class-properties',
            'transform-object-rest-spread'
          ]
        }
      },
    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'src/js'), 'node_modules'],
    extensions: ['.js']
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html')
    }),

    new CopyWebpackPlugin([{
      from: path.join(__dirname, 'src/img/*'),
      to: path.join(__dirname, 'dist')
    }], {debug: true}),

    new webpack.DefinePlugin({
      _DEBUG_: JSON.stringify(_DEBUG_),
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

/*
This way because otherwise Webstorm has issues to parse config
 */
/*if (NODE_ENV && envConfig[NODE_ENV]) {
  webpackConfig.watch = envConfig[NODE_ENV].watch
}*/

module.exports = webpackConfig
