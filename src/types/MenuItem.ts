export type MenuItem = {
  id: string;
  title: string;
  children?: MenuItem[];
  href: string;
};
