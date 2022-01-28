const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const generateConfig = (dev) => {
  const plugins = []
  if (dev) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    )
  } else {
    plugins.push(
      new BundleAnalyzerPlugin()
    )
  }
  return {
    resolve: {
      extensions: ['.js', '*', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: ['source-map-loader', 'babel-loader'],
          enforce: 'pre'
        },
        {
          test: /\.(less|css)$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'less-loader', options: { javascriptEnabled: true } }
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'url-loader?limit=8192'
          }
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2$)$/,
          use: {
            loader: 'file-loader'
          }
        }
      ]
    },
    plugins
  }
}

module.exports = {
  pro: generateConfig(),
  dev: generateConfig(true)
}
