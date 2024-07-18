import type { MenuItem } from "@/types/MenuItem";
import map from "lodash/map";
import { Menu } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/Accordion";
import { Sheet, SheetContent, SheetTrigger } from "../ui/Sheet";

interface IProps {
  items: MenuItem[];
  children?: React.ReactNode;
}

export default function NavbarMobile({ items, children }: IProps) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Menu size={32} />
        </SheetTrigger>
        <SheetContent className=" h-dvh bg-orange" side="top">
          {children}
          <Accordion type="single" collapsible className="flex w-full flex-col gap-4 pt-4">
            {map(items, (item) => {
              if (!item.children)
                return (
                  <a key={item.href} className="text-4xl" href={item.href}>
                    {item.title}
                  </a>
                );
              return (
                <AccordionItem className="border-none" value="main" key={item.href}>
                  <AccordionTrigger className="p-0 text-left font-normal text-4xl hover:no-underline">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2 pt-2 pl-4">
                    {map(item.children, (child) => (
                      <a key={child.href} className="text-xl" href={child.href}>
                        {child.title}
                      </a>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </SheetContent>
      </Sheet>
    </div>
  );
}
