import plural from "plurals-cldr";
import type { PartialRecord } from ".";

const allowedKeys = ["room", "element"] as const;

type Keys = (typeof allowedKeys)[number];
type Plurals = "zero" | "one" | "two" | "few" | "many" | "other";

interface IPlural extends Record<Keys, PartialRecord<Plurals, string>> {}

const plurals: IPlural = {
  room: {
    one: "кімната",
    few: "кімнати",
    many: "кімнат",
    other: "кімнати",
  },
  element: {
    one: "елемент",
    few: "елементи",
    many: "елементів",
    other: "елементів",
  },
};

export default function getPlurals(n: number | null | undefined, key: Keys): string | null {
  if (!n) return null;

  return plurals[key][plural("uk", n) ?? "other"] ?? null;
}
