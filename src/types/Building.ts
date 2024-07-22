import type dayjs from "dayjs";

export type BuildingItem = {
  content: string;
  type: "Photo" | "Video";
};

export type BuildingDate = {
  id: string;
  title: string;
  date: dayjs.Dayjs;
  count: number;
};
