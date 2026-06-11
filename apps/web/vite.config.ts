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
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-syntax': ['react-syntax-highlighter'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['gsap'],
  },
})
