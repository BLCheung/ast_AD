var path = require('path');
var cooking = require('cooking');

cooking.set({
  entry: {
      index: ['babel-polyfill', './src/main.js'],//App的
  },
  dist: './dist',
  template: {
      'index.html': {
          filename: 'index.htm', // 不指定默认使用键名
          chunks: ["index",'vendor', 'manifest'], // 不同页面使用不同的 chunk
          template: './index.tpl',
      },
      // 'app.html': {
      //     filename: 'app.html', // 不指定默认使用键名
      //     chunks: ["app",'vendor', 'manifest'], // 不同页面使用不同的 chunk
      //     template: './app.tpl',
      // },
      // 'launcher.html': {
      //     filename: 'launcher.html', // 不指定默认使用键名
      //     chunks: ["launcher",'vendor', 'manifest'], // 不同页面使用不同的 chunk
      //     template: './app.tpl',
      // },

  },

  devServer: {
    port: 8089,
    publicPath: '/'
  },

  // production
  clean: true,
  hash: true,
  sourceMap: !true,
  minimize: true,
  chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    // require('...')
  ],
  publicPath: './',//本来"/dist/"，改成"./"打包后才能正常
  assetsPath: 'static',
  urlLoaderLimit: 1,//10000,
  static: true,
  extractCSS: '[name].[contenthash:7].css',
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue2', 'less', 'autoprefixer']
});

module.exports = cooking.resolve();
