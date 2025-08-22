import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // optional, default is 5173
    proxy: {
      '/api': {
        target: 'https://nyaysetu-backend-2y0e.onrender.com', // your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
