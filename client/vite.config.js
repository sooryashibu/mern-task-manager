import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwind()],
  server: { 
    port: 5173, 
    open: true,
    proxy: {
      '/api': 'http://localhost:5000'  // ✅ forward API calls during local dev
    }
  },
  build: { outDir: 'dist', emptyOutDir: true }
})
