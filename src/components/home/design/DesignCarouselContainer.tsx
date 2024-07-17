import type { IDesignCategory } from "@/data/designs";
import map from "lodash/map";
import { memo } from "react";

interface IProps {
  selected?: IDesignCategory;
}

function DesignCarouselContainer({ selected }: IProps) {
  if (!selected) return null;
  return (
    <div className="embla__container">
      {map(new Array(selected.imageCount), (_, index) => (
        <div className="embla__slide h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]" key={index}>
          <img
            src={`/designs/${selected.id}/${index + 1}.webp`}
            loading="eager"
            className="h-full w-full object-cover"
            alt="gallery"
            width={1920}
            height={1080}
          />
        </div>
      ))}
    </div>
  );
}

export default memo(DesignCarouselContainer);
