import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://sorokoletovdu.github.io',
  base: '/ruby-profile',
  integrations: [tailwind()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
    routing: {
        prefixDefaultLocale: true // Forces /en/ path for consistency
    }
  }
});
