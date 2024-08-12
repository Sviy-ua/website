import type { BuildingItem } from "@/types/Building";
import { isFullPage } from "@notionhq/client";
import { NOTION_BULDINGS_DATABASE_ID } from "astro:env/server";
import compact from "lodash/compact";
import map from "lodash/map";
import client from ".";

export default async function getBuildings(dateId: string): Promise<BuildingItem[]> {
  const response = await client.databases.query({
    database_id: NOTION_BULDINGS_DATABASE_ID,
    filter: {
      and: [
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        {
          or: [
            {
              property: "Type",
              select: {
                equals: "Photo",
              },
            },
            {
              property: "Type",
              select: {
                equals: "Video",
              },
            },
          ],
        },
        {
          property: "Date",
          relation: {
            contains: dateId,
          },
        },
        {
          property: "Content",
          files: {
            is_not_empty: true,
          },
        },
      ],
    },
  });

  const results: (BuildingItem | null)[] = map(response?.results, (post) => {
    // If post is not a full page, return null
    if (!isFullPage(post)) return null;

    const { Date: _Date, Content, Type } = post.properties;

    // Need for type safety, but always passed
    if (Content.type !== "files" || !Content.files || !Content.files.length) return null;
    if (Type.type !== "select" || !Type.select) return null;

    const content = Content.files[0];
    const _type = Type.select.name;

    const response: BuildingItem = {
      content: "",
      type: "Photo",
    };

    if (content.type === "file") response.content = content.file.url;
    else if (content.type === "external") response.content = content.external.url;

    if (_type === "Video") response.type = "Video";

    return response;
  });

  return compact(results);
}
