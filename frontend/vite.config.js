import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/admin': {
        target: 'http://localhost:5175',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => (path === '/admin' ? '/admin/' : path),
      },
    },
  },
})
