import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html")
      },
      output: {
        manualChunks(id) {
          // Define custom chunk names based on the file path
          if (id.includes('node_modules/vite')) {
            // Group third-party dependencies into a single chunk
            return 'vite';
          }
          if (id.includes('src/')) {
            // Group modules from src directory into separate chunks
            const [, folder] = id.match(/src\/([^/]+)/);
            return folder;
          }
        }
      }
    }
  }
});
