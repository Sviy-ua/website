import type { ApartamentItem } from "@/types/Apartament";
import { isFullPage } from "@notionhq/client";
import { NOTION_APARTAMENTS_DATABASE_ID } from "astro:env/server";
import compact from "lodash/compact";
import map from "lodash/map";
import client from ".";

export default async function getApartaments(): Promise<ApartamentItem[]> {
  const response = await client.databases.query({
    database_id: NOTION_APARTAMENTS_DATABASE_ID,
    filter: {
      property: "Image",
      files: {
        is_not_empty: true,
      },
    },
    sorts: [
      {
        property: "Rooms",
        direction: "ascending",
      },
    ],
  });

  const results: (ApartamentItem | null)[] = map(response?.results, (post) => {
    // If post is not a full page, return null
    if (!isFullPage(post)) return null;

    const { Rooms, Section, RoomsNumber, Area, Image } = post.properties;

    // Need for type safety, but always passed
    if (Rooms.type !== "number" || !Rooms.number || Rooms.number < 0) return null;
    if (Section.type !== "number" || !Section.number || Section.number < 0) return null;
    if (Area.type !== "number" || !Area.number || Area.number < 0) return null;
    if (Image.type !== "files" || !Image.files || !Image.files.length) return null;
    if (
      RoomsNumber.type !== "rich_text" ||
      !RoomsNumber.rich_text[0] ||
      RoomsNumber.rich_text[0].type !== "text" ||
      !RoomsNumber.rich_text[0].text?.content
    )
      return null;

    const content = Image.files[0];
    if (content.type !== "file") return null;

    return {
      src: content.file.url,
      rooms: Rooms.number,
      area: Area.number,
      section: Section.number,
      roomsNumber: RoomsNumber.rich_text[0].text.content,
    };
  });

  return compact(results);
}
