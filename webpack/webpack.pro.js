const path = require('path')
const baseConfig = require('./base')

module.exports = Object.assign({
  mode: 'production',
  entry: {
    app: './app/views/index.js'
  },
  // 是否进行代码压缩
  optimization: {
    minimize: false // <---- disables uglify.
  },
  output: {
    path: path.resolve(__dirname, '../dist/assets'),
    publicPath: '/assets',
    filename: '[name].js'
  }
}, baseConfig.pro)
