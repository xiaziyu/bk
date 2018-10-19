module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/h5/' : '/',
  outputDir: '../public/h5',
  lintOnSave: false,
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'src/main.js',
      // the source template
      template: 'template/index.html',
      // output as dist/index.html
      filename: 'index.html',
      chunks: ['chunk-libs', 'chunk-common', 'index', 'chunk-vant']
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
            vant: {
              name: 'chunk-vant', // 单独将 vant 拆包
              priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
              test: /[\\/]node_modules[\\/]vant[\\/]/
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
    port: 1375,
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
