import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";
import playformInline from "@playform/inline";
import devtoolBreakpoints from "astro-devtool-breakpoints";
import icon from "astro-icon";
import metaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
  integrations: [
    tailwind(),
    playformCompress(),
    icon(),
    sitemap(),
    react(),
    metaTags(),
    devtoolBreakpoints(),
    partytown(),
    playformInline(),
    robotsTxt(),
  ],
  experimental: {
    env: {
      schema: {},
    },
  },
  vite: {
    ssr: {
      noExternal: ["react-use"],
    },
  },
});
