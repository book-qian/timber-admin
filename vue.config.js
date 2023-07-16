/*
 * @Author: yangyongqian
 * @Date: 2023-07-01 17:31:30
 * @Description: 项目配置文件
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 本地反向代理配置
  devServer: {
    proxy: {
      '/adminapi': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
    client: {
      overlay: false
    }
  }
})
