import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jade-website.pages.dev',
  output: 'static',
  build: {
    format: 'file'
  },
  vite: {
    css: {
      devSourcemap: true
    }
  }
});
