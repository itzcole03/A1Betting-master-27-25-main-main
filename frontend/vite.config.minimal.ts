import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// Minimal config to bypass Console Ninja issues
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8173,
    host: '0.0.0.0',
    strictPort: true,
    hmr: false, // Disable HMR to avoid Console Ninja
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    sourcemap: false,
    minify: false,
  },
  esbuild: {
    logLevel: 'error',
    target: 'es2020',
  },
  optimizeDeps: {
    force: true,
    include: ['react', 'react-dom'],
  },
}) 