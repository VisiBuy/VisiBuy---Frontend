import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'sass';

export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,  // Ensure Dart Sass is used
        api: 'modern', // Use modern API or 'modern-compiler'
      },
    },
  },
});
