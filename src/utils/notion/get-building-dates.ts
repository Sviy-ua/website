import type { BuildingDate } from "@/types/Building";
import { isFullPage } from "@notionhq/client";
import { NOTION_BUILDING_DATES_DATABASE_ID } from "astro:env/server";
import dayjs from "dayjs";
import compact from "lodash/compact";
import map from "lodash/map";
import client from ".";

export default async function getBuildingDates(): Promise<BuildingDate[]> {
  const response = await client.databases.query({
    database_id: NOTION_BUILDING_DATES_DATABASE_ID,
  });

  const results = map(response.results, (el) => {
    // If post is not a full page, return null
    if (!isFullPage(el)) return null;

    const { Name: nameObject, Content: content, Date: dateObject } = el.properties;

    if (dateObject.type !== "date" || !dateObject.date) return null;
    if (nameObject.type !== "title" || !nameObject.title) return null;
    if (content.type !== "relation" || !content.relation.length) return null;
    if (!content.relation[0].id) return null;

    return {
      id: el.id,
      title: nameObject.title[0].plain_text,
      date: dayjs(dateObject.date.start),
      count: content.relation.length,
    };
  });

  return compact(results);
}
