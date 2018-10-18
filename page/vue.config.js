module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
  outputDir: '../dist',
  lintOnSave: false,
  productionSourceMap: false,
  pages: {
    admin: {
      entry: 'src/admin.js',
      template: 'template/admin.html',
      favicon: 'template/favicon.ico',
      filename: 'admin.html',
      chunks: ['chunk-libs', 'chunk-common', 'admin', 'chunk-elementUI']
    }
  },
  configureWebpack: config => {
    Object.assign(config, { // 开发生产共同配置
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // 只打包初始时依赖的第三方
            },
            elementUI: {
              name: 'chunk-elementUI', // 单独将 elementUI 拆包
              priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
              test: /[\\/]node_modules[\\/]element-ui[\\/]/
            }
          }
        }
      }
    })
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  devServer: {
    host: 'localhost',
    port: 1377,
    open: true, //配置自动启动浏览
    proxy: {
      '/mock':{
        target: ' https://easy-mock.com/mock/5b8f31b69f979b4bf552ef79/bk',
        pathRewrite: {'^/mock' : ''},
        changeOrigin: true,
        secure: false
      },
      '/api':{
        target: 'https://buicktest.g100.org.cn',
        pathRewrite: {'^/api' : ''},
        changeOrigin: true,
        secure: false
      }
    }
  }
};
