import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Keep the libraries in their own chunks: they change far less often
        // than the site's own code, so a content edit no longer invalidates
        // ~500 kB of vendor JS in visitors' caches.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap', 'gsap/ScrollTrigger'],
          motion: ['motion'],
        },
      },
    },
  },
});
