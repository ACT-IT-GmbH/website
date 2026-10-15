import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://act-it.eu',
  integrations: [sitemap({ filter: (page) => !/\/(impressum|datenschutz)\/$/.test(page) })],
  build: { inlineStylesheets: 'auto' },
  markdown: { shikiConfig: { theme: 'github-light' } },
});
