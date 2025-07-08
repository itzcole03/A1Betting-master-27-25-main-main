import { defineConfig } from 'vite';

// Disable Console Ninja to prevent startup issues
process.env.DISABLE_CONSOLE_NINJA = 'true';

export default defineConfig({
  server: {
    port: 3001,
    host: '0.0.0.0',
    strictPort: false,
  },
  define: {
    'process.env.DISABLE_CONSOLE_NINJA': '"true"',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
  build: {
    target: 'es2020',
  },
});
