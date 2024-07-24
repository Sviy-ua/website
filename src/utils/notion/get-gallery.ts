import { isFullPage } from "@notionhq/client";
import { NOTION_GALLERY_DATABASE_ID } from "astro:env/server";
import compact from "lodash/compact";
import map from "lodash/map";
import client from ".";

export default async function getGallery(): Promise<string[]> {
  const gallery = await client.databases.query({
    database_id: NOTION_GALLERY_DATABASE_ID,
    filter: {
      property: "Image",
      files: {
        is_not_empty: true,
      },
    },
    sorts: [
      {
        timestamp: "created_time",
        direction: "ascending",
      },
    ],
  });

  const galleryItems: (string | null)[] = map(gallery?.results, (post) => {
    // If post is not a full page, return null
    if (!isFullPage(post)) return null;

    const { Image } = post.properties;

    // Need for type safety, but always passed
    if (Image.type !== "files" || !Image.files || !Image.files.length) return null;

    const content = Image.files[0];

    if (content.type !== "file") return null;

    return content.file.url;
  });

  return compact(galleryItems);
}
