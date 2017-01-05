// https://github.com/shelljs/shelljs
require('./check-versions')();
// 使用了 shelljs 插件，可以让我们在 node 环境的 js 中使用 shell
require('shelljs/global');
env.NODE_ENV = 'production';

var path = require('path');
var config = require('../config');
// 一个很好看的 loading 插件
var ora = require('ora');
var webpack = require('webpack');
var webpackConfig = require('./webpack.prod.conf');

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening minetwork.html over file:// won\'t work.\n'
);
// 使用 ora 打印出 loading + log
var spinner = ora('building for production...');
// 开始 loading 动画
spinner.start();
// 拼接编译输出文件路径
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
// 删除这个文件夹 （递归删除）
rm('-rf', assetsPath);
// 创建此文件夹 
mkdir('-p', assetsPath);
// 复制 static 文件夹到我们的编译输出目录
cp('-R', 'resources/*', assetsPath);

//  开始 webpack 的编译
webpack(webpackConfig, function (err, stats) {
   // 编译成功的回调函数
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
});
