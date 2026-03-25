import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://jade-website-v2.pages.dev',
  output: 'static',

  build: {
    format: 'file'
  },

  vite: {
    css: {
      devSourcemap: true
    }
  },

  adapter: cloudflare()
});