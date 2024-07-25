import designs from "@/data/designs";
import map from "lodash/map";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import DesignCarousel from "./DesignCarousel";

export default function DesignCarouselController() {
  const [selected, setSelected] = useState<string | null>("1k");

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {map(designs, (item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setSelected(item.id)}
            className={twMerge(
              "flex-1 text-nowrap border border-black px-3 py-2 font-medium text-xl duration-150 ease-in-out hover:bg-orange-hover",
              selected === item.id && "bg-orange",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="aos-init relative pt-6" data-aos="fade-up" data-aos-delay="150">
        {map(designs, (item) => (
          <DesignCarousel key={item.id} item={item} selected={selected} />
        ))}
      </div>
    </>
  );
}
