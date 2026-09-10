import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    // Docker Desktop's bind mount doesn't reliably forward filesystem
    // change events into the container on Windows, so the default
    // watcher misses edits — poll instead.
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});
