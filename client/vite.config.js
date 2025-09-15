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
  base: '',                // important: use relative paths in production
  build: {
    outDir: '../dist',     // emit into <repo root>/dist
    emptyOutDir: true,
  },
});
