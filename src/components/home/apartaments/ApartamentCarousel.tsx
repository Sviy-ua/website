import type { ApartamentItem } from "@/types/Apartament";
import useEmblaCarousel from "embla-carousel-react";
import map from "lodash/map";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ApartamentCarouselItem from "./ApartamentCarouselItem";

export default function ApartamentCarousel({ data }: { data: ApartamentItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  return (
    <div
      className="embla relative mx-4 mt-8 select-none sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20"
      data-aos="fade-up"
      data-aos-delay="150"
      ref={emblaRef}
    >
      <div className="embla__container">
        {map(data, (item) => (
          <ApartamentCarouselItem data={item} key={item.src} />
        ))}
      </div>
      <ArrowLeft
        id="slide-prev"
        className="-translate-y-1/2 absolute top-1/2 left-2 cursor-pointer text-orange"
        size={48}
        data-aos="fade-up"
        data-aos-delay="250"
        onClick={() => emblaApi?.scrollPrev()}
      />
      <ArrowRight
        id="slide-next"
        className="-translate-y-1/2 absolute top-1/2 right-2 cursor-pointer text-orange"
        size={48}
        data-aos="fade-up"
        data-aos-delay="250"
        onClick={() => emblaApi?.scrollNext()}
      />
    </div>
  );
}
