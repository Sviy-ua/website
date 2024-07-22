import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";
import playformInline from "@playform/inline";
import { adapter } from "astro-auto-adapter";
import devtoolBreakpoints from "astro-devtool-breakpoints";
import icon from "astro-icon";
import metaTags from "astro-meta-tags";
import { defineConfig, envField } from "astro/config";

import robotsTxt from "astro-robots-txt";

const multiAdapter = await adapter();

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
  adapter: multiAdapter,
  output: "server",
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
      schema: {
        NOTION_API_KEY: envField.string({ context: "server", access: "secret" }),
        NOTION_BUILDING_DATES_DATABASE_ID: envField.string({ context: "server", access: "secret" }),
        NOTION_BULDINGS_DATABASE_ID: envField.string({ context: "server", access: "secret" }),
      },
      validateSecrets: true,
    },
  },
  vite: {
    ssr: {
      noExternal: ["react-use"],
    },
    plugins: [
      {
        name: "import.meta.url-transformer",
        transform: (code, id) => {
          if (id.endsWith(".astro")) return code.replace(/import.meta.url/g, `"${id}"`);
        },
      },
    ],
  },
});
