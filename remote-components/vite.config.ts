

// vite.config.js in todo-components
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote-components",
      filename: "remoteEntry.js",
      exposes: {
        // "./List": "./src/components/List.tsx",
        // "./Input": "./src/components/Input.tsx",
        "./App": "./src/App.jsx",
       
      },
      shared: ["react"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 4173, // Example port for the host app
  }
});
