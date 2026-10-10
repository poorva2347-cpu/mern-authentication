import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // When the Express backend is ready, uncomment this so that
    // requests to /api are forwarded to it during development.
    // proxy: {
    //   '/api': 'http://localhost:5000',
    // },
  },
});
