"use client";

import type { IDesignCategory } from "@/data/designs";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import map from "lodash/map";
import { ArrowLeft, ArrowRight } from "lucide-react";

const options = { loop: true };
const plugins = [Autoplay({ delay: 5000 })];

interface IProps {
  item: IDesignCategory;
  selected: string | null;
}

export default function DesignCarousel({ item, selected }: IProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  if (item.id !== selected) return null;
  return (
    <div className="embla duration-300" ref={emblaRef}>
      <div className="embla__container">
        {map(new Array(item.imageCount), (_, index) => (
          <div className="embla__slide h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]" key={index}>
            <img
              src={`/designs/${item.id}/${index + 1}.webp`}
              loading="eager"
              className="h-full w-full object-cover"
              alt="gallery"
              width={1920}
              height={1080}
            />
          </div>
        ))}
        <div className="embla__slide h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <img
            src={`/designs/${item.id}/plan.webp`}
            loading="eager"
            className="h-full w-full object-cover"
            alt="gallery"
            width={1920}
            height={1080}
          />
        </div>
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
  );
}
