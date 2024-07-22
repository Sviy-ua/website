import { Client } from "@notionhq/client";
import { NOTION_API_KEY } from "astro:env/server";

const client = new Client({
  auth: NOTION_API_KEY,
});

export default client;
