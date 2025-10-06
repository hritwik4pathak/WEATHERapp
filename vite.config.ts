import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: './',
  build: {
    // Increase chunk size warning limit to 1 MB
    chunkSizeWarningLimit: 1000,

    // Manual chunking to separate vendor code
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and ReactDOM into a separate chunk
          reactVendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
