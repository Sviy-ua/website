import type { MenuItem } from "@/types/MenuItem";
import map from "lodash/map";
import { twMerge } from "tailwind-merge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/NavigationMenu";

interface IProps {
  items: MenuItem[];
}

export default function NavbarDesktop({ items }: IProps) {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {map(items, (item) => (
          <NavigationMenuItem key={item.href}>
            {item.children ? (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col gap-1 bg-orange px-3 py-2">
                  {map(item.children, (child) => (
                    <NavigationMenuLink
                      className={twMerge(navigationMenuTriggerStyle(), "w-full hover:bg-orange-hover")}
                      href={child.href}
                      key={child.href}
                    >
                      {child.title}
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink className={navigationMenuTriggerStyle()} href={item.href}>
                {item.title}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
