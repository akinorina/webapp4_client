import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'www.example.com',
    port: 443,
    https: {
      key: './nginx/ssl/server.key',
      cert: './nginx/ssl/server.crt'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/webapp4': {
        target: 'http://localhost:9000',
        changeOrigin: true
      }
    },
    open: true
  }
})
