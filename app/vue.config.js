module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: '../dist',
  lintOnSave: true,
  productionSourceMap: false,
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
      }
    }
  }
};
