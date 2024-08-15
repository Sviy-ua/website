import type { ApartamentItem } from "@/types/Apartament";
import getPlurals from "@/utils/plurals";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ApartamentCarouselItem({ data }: { data: ApartamentItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="embla__slide embla__slide__apartament embla__slide__margin flex flex-col">
      <p>{`${data.rooms} ${getPlurals(data.rooms, "room")} | ${data.section} секція`}</p>
      <div className="flex flex-col border border-black">
        <div className="flex flex-row border-black border-b">
          <div className="flex-1 px-3 py-2">
            <p className="uppercase">Квартири</p>
            <p className="text-nowrap font-medium text-xl md:text-3xl">{data.roomsNumber}</p>
          </div>
          <div className="h-full w-[1px] bg-black" />
          <div className="flex-1 px-3 py-2">
            <p className="uppercase">Загальна площа</p>
            <p className="text-nowrap font-medium text-xl md:text-3xl">{data.area} m²</p>
          </div>
        </div>
        <button type="button" onClick={() => setOpen(!open)} className="flex items-center justify-center p-6">
          <img
            src={data.src}
            className="h-[200px] object-contain duration-300 sm:h-[300px] md:h-[400px] lg:h-[500px]"
            alt=""
          />
        </button>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: data.src }]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </div>
  );
}
