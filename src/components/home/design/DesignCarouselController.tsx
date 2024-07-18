import designs from "@/data/designs";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import find from "lodash/find";
import map from "lodash/map";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import DesignCarouselContainer from "./DesignCarouselContainer";

export default function DesignCarouselController() {
  const [selected, setSelected] = useState<string>("1k");
  const selectedDesign = useMemo(() => find(designs, ["id", selected]), [selected]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  const onChange = (id: string) => {
    setSelected(id);
    emblaApi?.scrollTo(0);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {map(designs, (item, index) => (
          <button
            type="button"
            key={item.id}
            onClick={() => onChange(item.id)}
            className={twMerge(
              "flex-1 text-nowrap border border-black px-3 py-2 font-medium text-xl duration-300 ease-in-out hover:bg-orange-hover",
              selected === item.id && "bg-orange",
            )}
            data-aos="fade-up"
            data-aos-delay={50 * index}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="relative pt-6" data-aos="fade-up" data-aos-delay="150">
        <div className="embla" ref={emblaRef}>
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
