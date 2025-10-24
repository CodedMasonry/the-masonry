// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import clerk from "@clerk/astro";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ["dxgc3f8f0p.ufs.sh"],
  },

  integrations: [react(), clerk()],
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
  output: "server",
});
