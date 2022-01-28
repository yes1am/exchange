const express = require('express')
const path = require('path')
const webpack = require('webpack')

// TODO: 以下涉及到热更新的代码需要判断环境，例如在生产环境下 webpack-dev-middleware 并不存在
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../../webpack/webpack.dev')
const compiler = webpack(config)
const template = require('./template')

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const { generateKeys, decrypt, encrypt } = require('./util');

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  lazy: false,
  stats: {
    colors: true
  }
}))

// Add hot middleware support, Check [HMR] connected in console
app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr'
}))

// node 静态资源
app.use('/static', express.static(path.resolve(__dirname, './static')))

// 前端资源
app.use('/assets', express.static(path.resolve(__dirname, '../../dist/assets')))

app.get('/api/tokens', async function(req, res) {
  try {
    const { publicKey,privateKey  }  = await generateKeys()
    console.log(`
==== 生成公私钥 ====
publicKey: ${publicKey}
privateKey: ${privateKey}
    `)
    res.json({
      err: null,
      publicKey,
      privateKey
    });
  } catch (error) {
    console.log(`[generate tokens error]:`, error)
    res.json({
      err: JSON.stringify(error)
    })
  }
});

app.post('/api/tokens/decrypt', async function(req, res) {
  const { data, key } = req.body;
  try {
    const _data = decrypt(data, key);
    res.json({
      err: null,
      data: _data
    })
  } catch (error) {
    console.log(`[decrypt error]:`, error)
    res.json({
      err: error.toString(),
    })
  }
});

app.post('/api/tokens/encrypt', async function(req, res) {
  const { data, key } = req.body;
  try {
    const _data = encrypt(data, key);
    res.json({
      err: null,
      data: _data
    })
  } catch (error) {
    console.log(`[encrypt error]:`, error)
    res.json({
      err: error.toString(),
    })
  }
});

// 设置为 * ,保证刷新能进入前端路由
app.all('*', function (req, res) {
  res.send(template.index())
})

app.listen(3004, '0.0.0.0', function () {
  console.log(`
===================================
Example app listening on port 3004!
===================================`)
})
