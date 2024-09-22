import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteToml } from 'vite-plugin-toml';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteToml()],
  build: {
    rollupOptions: {
      external: ['wrangler.toml'],
    },
  },
});
