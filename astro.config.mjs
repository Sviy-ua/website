import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { z } from "astro/zod";

const schema = z.object({});

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
  integrations: [tailwind(), playformCompress(), icon(), sitemap(), react()],
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
