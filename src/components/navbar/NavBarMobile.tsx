import "@/styles/navbar.css";
import type { MenuItem } from "@/types/MenuItem";

import map from "lodash/map";
import startsWith from "lodash/startsWith";
import { useEffect, useMemo, useState } from "react";
import { useKey, useLocation } from "react-use";
import { twMerge } from "tailwind-merge";

interface IProps {
  menu: MenuItem[];
}

export default function NavbarMenu({ menu }: IProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useKey("Escape", () => setOpen(false));

  useEffect(() => {
    document.body.style.overflowY = open ? "hidden" : "unset";
  }, [open]);

  const pathName = useMemo(() => location.pathname || "/", [location]);

  return (
    <>
      <button
        type="button"
        id="nav_menu_btn"
        className={twMerge(open && "open", "outline-none md:hidden")}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
        <span />
      </button>

      <nav id="menu" className={twMerge(open && "open", "main-menu")}>
        <ul className="nav">
          {map(menu, (item) => (
            <li key={item.href} className="nav__item">
              <a
                href={item.href}
                aria-label={item.title}
                className={twMerge(startsWith(pathName, item.href) && "active !important")}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </a>
              {item.children && (
                <ul className="nav__children">
                  {map(item.children, (child) => (
                    <li key={child.href}>
                      <a href={child.href} aria-label={child.title} onClick={() => setOpen(false)}>
                        {child.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
