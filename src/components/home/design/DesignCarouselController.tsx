import designs from "@/data/designs";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import find from "lodash/find";
import map from "lodash/map";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import DesignCarouselContainer from "./DesignCarouselContainer";

const options = { loop: true };
const plugins = [Autoplay({ delay: 5000 })];

export default function DesignCarouselController() {
  const [selected, setSelected] = useState<string>("1k");
  const [hidden, setHidden] = useState<boolean>(false);
  const selectedDesign = useMemo(() => find(designs, ["id", selected]), [selected]);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  const onChange = async (id: string) => {
    setHidden(true);
    setTimeout(() => {
      setSelected(id);
      emblaApi?.scrollTo(0);
      setTimeout(() => setHidden(false), 150);
    }, 150);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {map(designs, (item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => onChange(item.id)}
            className={twMerge(
              "flex-1 text-nowrap border border-black px-3 py-2 font-medium text-xl duration-150 ease-in-out hover:bg-orange-hover",
              selected === item.id && "bg-orange",
            )}
            disabled={hidden}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="aos-init relative pt-6" data-aos="fade-up" data-aos-delay="150">
        <div className={twMerge("embla duration-300", hidden ? "opacity-0" : "opacity-100")} ref={emblaRef}>
          <DesignCarouselContainer selected={selectedDesign} />
        </div>
        <ArrowLeft
          id="slide-prev"
          className="-translate-y-1/2 -left-12 sm:-left-16 absolute top-1/2 cursor-pointer text-orange"
          size={48}
          onClick={() => emblaApi?.scrollPrev()}
        />
        <ArrowRight
          id="slide-next"
          className="-translate-y-1/2 -right-12 sm:-right-16 absolute top-1/2 cursor-pointer text-orange"
          size={48}
          onClick={() => emblaApi?.scrollNext()}
        />
      </div>
    </>
  );
}
