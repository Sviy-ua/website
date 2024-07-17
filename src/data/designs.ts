export interface IDesignCategory {
  id: string;
  title: string;
  baseHref: string;
  imageCount: number;
}

const designs: IDesignCategory[] = [
  {
    id: "1k",
    title: "1k",
    baseHref: "1k",
    imageCount: 10,
  },
  {
    id: "1k-55",
    title: "1k-55",
    baseHref: "1k-55",
    imageCount: 10,
  },
  {
    id: "1k-2k",
    title: "1k-2k",
    baseHref: "1k-2k",
    imageCount: 11,
  },
  {
    id: "2k-2k",
    title: "2k-2k",
    baseHref: "2k-2k",
    imageCount: 13,
  },
  {
    id: "2k-3k",
    title: "2k-3k",
    baseHref: "2k-3k",
    imageCount: 10,
  },
];

export default designs;
