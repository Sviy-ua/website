import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type PartialRecord<K extends string, T> = {
  [P in K]?: T;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
