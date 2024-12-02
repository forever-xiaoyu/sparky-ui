import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    port: 5173,
    // 反向代理
    proxy: {
      '/api': {
        // target: 'http://192.168.0.253:15000/', // test环境
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    // 是否自动在浏览器打开
    open: false,
    // 是否开启 https
    https: false,
    host: '0.0.0.0',
  },
})
