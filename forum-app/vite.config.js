import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    allowedHosts: [
      'hezekiah-acropetal-orderingly.ngrok-free.dev',
      '.ngrok-free.dev',
      '.ngrok.io',
    ],
  },
})
