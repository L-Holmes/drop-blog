import { defineConfig } from 'astro/config';

// English lives at the root (/recipes/...). Extra languages get a prefix
// (/es/recipes/...). All pages are pre-rendered to static HTML.
export default defineConfig({
  site: 'https://example.com',
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  build: { format: 'directory' },
});
