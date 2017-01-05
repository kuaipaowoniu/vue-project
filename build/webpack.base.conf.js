// webpack公用基础配置
// 使用 NodeJS 自带的文件路径插件
var path = require('path');
// 引入 config/index.js
var config = require('../config');
// 引入一些小工具
var utils = require('./utils');
// 拼接我们的工作区路径为一个绝对路径
var projectRoot = path.resolve(__dirname, '../');
// 将 NodeJS 环境作为我们的编译环境
var env = process.env.NODE_ENV;

// 是否在 dev 环境下开启 cssSourceMap ，在 config/index.js 中可配置
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap);
// 是否在 production 环境下开启 cssSourceMap ，在 config/index.js 中可配置
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap);
// 最终是否使用 cssSourceMap
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

module.exports = {
  // 程序入口,可涉及到多页
  entry: {
    app: './src/main.js'
    //j0201: './src/vuejs2-demo/02-GattingStarted/j0201.js', // 多页 j0201.js
    //j0202: './src/vuejs2-demo/02-GattingStarted/j0202.js', // 多页 j0202.js
  },
  // 输出目录
  output: {
    // 编译输出的根路径
    path: config.build.assetsRoot,
    // 正式发布环境下编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    // 编译输出的文件名
    filename: '[name].js'
  },
  // 影响模块的解决方案
  resolve: {
    // root: [process.cwd() + '/src', process.cwd() + '/node_modules'],
    // 用于指明程序自动补全识别哪些后缀，注意一下，extensions 第一个是空字符串，对应不需要后缀的情况
    extensions: ['', '.js', '.vue'],
    // 一个目录(或者目录绝对目录的数组)。如果webpack 在 resolve.root 或者 resolve.modulesDirectories 实在找不到某个模块了，会去这个（些）目录中找
    // 不进行自动补全或处理的文件或者文件夹
    fallback: [path.join(__dirname, '../node_modules')],
    // 使用别名，对模块请求重定向，据说可以缩短打包时间
    alias: {
       // 默认路径代理，例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
      'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  // 跟 resolve很像，但是是为loaders准备的
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {

    /**
     loader：标准格式 多匹配器解析顺序是从右到左
     test: /\.(js|jsx)$/,           //注意是正则表达式，不要加引号，匹配要处理的文件
     loader: 'eslint-loader',       //要使用的loader，"-loader"可以省略
     include: [path.resolve(__dirname, "src/app")],   //把要处理的目录包括进来
     exclude: [nodeModulesPath]     //排除不处理的目录
    */
    // 预检查加载器
    // preLoaders: [
    //   {
    //     test: /\.vue$/,
    //     loader: 'eslint', 
    //     include: projectRoot,
    //     exclude: /node_modules/
    //   },
    //   {
    //     test: /\.js$/,
    //     loader: 'eslint',
    //     include: projectRoot,
    //     exclude: /node_modules/
    //   }
    // ],
    // loaders加载器
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // eslint: {
  //   formatter: require('eslint-friendly-formatter')
  // },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}
