import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import map from "lodash/map";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface IProps {
  images: string[] | null;
}

export default function GalleryCarousel({ images }: IProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  if (!images || images.length === 0) return null;

  return (
    <div className="embla relative" ref={emblaRef}>
      <div className="embla__container">
        {map(images, (src) => (
          <div className="embla__slide h-[800px]" key={src}>
            <img src={src} loading="eager" className="h-[800px] w-full object-cover" alt="gallery-item" />
          </div>
        ))}
      </div>
      <ArrowLeft
        onClick={() => emblaApi?.scrollPrev()}
        className="-translate-y-1/2 absolute top-1/2 left-8 cursor-pointer text-orange"
        size={48}
      />
      <ArrowRight
        onClick={() => emblaApi?.scrollNext()}
        className="-translate-y-1/2 absolute top-1/2 right-8 cursor-pointer text-orange"
        size={48}
      />
    </div>
  );
}
