import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '', // 使用相对路径，支持子目录部署
  server: {
    port: 5175, // 固定端口
    cors: true, // 允许跨域请求
  },
  build: {
    minify: false, // 关闭压缩以保留调试日志
  },
})
