// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwind()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  // emit into client/dist so Vercel can find it
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
