import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_BACKEND_URL': JSON.stringify('http://localhost:8001'),
    'process.env.VITE_BACKEND_URL': JSON.stringify('http://localhost:8001'),
  },
})