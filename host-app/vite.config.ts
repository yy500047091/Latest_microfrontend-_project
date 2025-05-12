// host-app/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host-app',
      remotes: {
        remoteComponents: "http://localhost:5001/assets/remoteEntry.js", // Match the name from the remote's config
      },
      shared: ['react', 'react-dom'], // Share dependencies if needed
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5173, // Example port for the host app
  }
});