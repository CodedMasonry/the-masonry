// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ["dxgc3f8f0p.ufs.sh"],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "tap",
  },

  integrations: [react()],
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
});
