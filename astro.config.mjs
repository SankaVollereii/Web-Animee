// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import vercel from '@astrojs/vercel/serverless'; // atau /static jika statis

import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
output: 'server', // Penting untuk SSR
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: false,
    },
  },

  output: "server",

  adapter: cloudflare({
    platformProxy: {
      enabled: false,
    },
  }),

  integrations: [playformCompress()],
});