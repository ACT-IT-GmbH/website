import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://act-it.eu',
  integrations: [sitemap({ filter: (page) => !/\/(impressum|datenschutz)\/$/.test(page) })],
  build: { inlineStylesheets: 'auto' },
  markdown: { shikiConfig: { theme: 'github-light' } },
  // Old blog paths from the Jekyll site; GitHub Pages cannot send 301s, so Astro emits meta-refresh pages.
  redirects: {
    '/apex/': '/blog/',
    '/apex/apex-anwendung-importen-und-exportieren/': '/blog/apex-anwendung-importen-und-exportieren/',
    '/apex/apex-master-interactive-report-detail/': '/blog/apex-master-interactive-report-detail/',
    '/apex/check-inside-your-apex-application-if/': '/blog/check-apex-debug-mode/',
    '/apex/copy-and-paste-to-clipboard/': '/blog/copy-and-paste-to-clipboard/',
    '/apex/create-apexcollection-and-select-data/': '/blog/create-apexcollection-and-select-data/',
    '/apex/enable-save-button-on-form-change/': '/blog/enable-save-button-on-form-change/',
    '/apex/generierung-von-bitlisten-mit-hilfe-von/': '/blog/generierung-von-bitlisten-mit-hilfe-von/',
    '/apex/importing-xml-file-with-invalid/': '/blog/importing-xml-file-with-invalid/',
    '/apex/Interactive-grid-after-update-trigger/': '/blog/interactive-grid-after-update-trigger/',
    '/apex/interactive-grid-after-update-trigger/': '/blog/interactive-grid-after-update-trigger/',
    '/apex/interactive-grid-automatic-position-number/': '/blog/interactive-grid-automatic-position-number/',
    '/apex/interactive-grid-validation-check-for-duplicated-column-entries/': '/blog/interactive-grid-validation-check-for-duplicated-column-entries-over-a/',
    '/apex/interactive-report-standard-column/': '/blog/',
    '/apex/oracle-sql-calculate-amount-of-workdays/': '/blog/oracle-sql-calculate-amount-of-workdays/',
    '/apex/set-apex-application-name-for-dev-test/': '/blog/set-apex-application-name-for-dev-test-prod/',
    '/apex/show-all-views-including-specific-string/': '/blog/show-all-views-including-specific-string/',
    '/apex/sql-calculate-past-time-between-two/': '/blog/sql-calculate-past-time-between-two/',
    '/apex/sql-developer-quick-outline-with-sql/': '/blog/sql-developer-quick-outline-with-sql/',
    '/apex/using-dynamic-tooltips-in-your/': '/blog/using-dynamic-tooltips-in-your/',
  },
});
