import { defineConfig } from 'astro/config';
// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    define: {
      "process.env.MICROCMS_SERVICE_DOMAIN": JSON.stringify(process.env.MICROCMS_SERVICE_DOMAIN),
      "process.env.MICROCMS_API_KEY": JSON.stringify(process.env.MICROCMS_API_KEY)
    },
    ssr: {
      noExternal: ["path-to-regexp"]
    }
  }
});