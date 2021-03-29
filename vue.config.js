module.exports = {
  configureWebpack: {
    resolve: {
      // 配置路径别名（@ 代表 src）
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
