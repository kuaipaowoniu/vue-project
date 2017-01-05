// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        // 使用 config/prod.env.js 中定义的编译环境
        env: require('./prod.env'),
        // 编译输入的 index.html 文件
        index: path.resolve(__dirname, '../dist/minetwork.html'),
        // 编译输出的静态资源根路径
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 编译输出的二级目录
        assetsSubDirectory: 'resources',
        // 编译发布上线路径的根目录，可配置为资源服务器域名或 CDN 域名
        assetsPublicPath: '/',
        // 是否开启 cssSourceMap
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        // 是否开启 gzip
        productionGzip: false,
        // 需要使用 gzip 压缩的文件扩展名
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: require('./dev.env'),
        port: 9090,
        assetsSubDirectory: 'resources',// 发布时需要注意
        assetsPublicPath: '/',
        stats: { colors: true },
        proxyTable: {
            "/api": {
                target: "http://minetwork.dev.bizcn.com", // http://minetwork.dev.bizcn.com/api/users/index/
                changeOrigin: true, // 本地会虚拟一个服务端接收你的请求并代你发送该请求
                logLevel: 'debug',// 开启日志追踪
                pathRewrite: {
                    '^/api':'api'
                }
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}