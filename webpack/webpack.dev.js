const path = require('path')
const baseConfig = require('./base')

module.exports = Object.assign({
  mode: 'development',
  // 开启 source map，方便在 chrome source 中查看可阅读的代码
  devtool: 'source-map',
  entry: {
    app: ['./app/views/index.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true']
  },
  output: {
    path: path.resolve(__dirname, '../dist/assets'),
    publicPath: '/assets',
    filename: '[name].js'
  }
}, baseConfig.dev)
