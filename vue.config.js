const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = '手工账系统' // page title
module.exports = {
  // 选项...
  publicPath: '',
  outputDir: 'shou_gong_zhang',
  assetsDir: './static',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
