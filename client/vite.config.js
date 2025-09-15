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
  // Use /client as the base path in production so that built assets
  // reference /client/assets/... and the entry point is /client/index.html.
  base: process.env.NODE_ENV === 'production' ? '/client/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
