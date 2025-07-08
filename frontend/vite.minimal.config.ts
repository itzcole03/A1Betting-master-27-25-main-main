import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Disable Console Ninja
process.env.DISABLE_CONSOLE_NINJA = 'true';
process.env.CONSOLE_NINJA_DISABLE = 'true';

// Minimal config to get server running
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: false,
    open: false,
  },
  define: {
    'process.env.DISABLE_CONSOLE_NINJA': '"true"',
  },
  esbuild: {
    logLevel: 'silent',
  },
});
