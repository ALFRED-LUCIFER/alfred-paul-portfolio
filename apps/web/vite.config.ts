import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-motion': ['motion'],
          'vendor-radix': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-tabs',
            '@radix-ui/react-select',
            '@radix-ui/react-dropdown-menu',
          ],
          'vendor-particles': ['@tsparticles/react', '@tsparticles/slim'],
          'vendor-syntax': ['react-syntax-highlighter'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['gsap'],
  },
})
