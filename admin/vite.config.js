import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Keep root base for standalone Vercel/admin-subdomain deployments.
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5175,
  },
})
