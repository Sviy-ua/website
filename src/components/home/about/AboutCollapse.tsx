import { ChevronDown } from "lucide-react";
import { useState } from "react";
import CollapsePkg from "react-collapse";
import { twMerge } from "tailwind-merge";

const { UnmountClosed } = CollapsePkg;

export default function AboutCollapse() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-3 text-balance text-lg md:text-xl lg:text-2xl">
      <p>Тут — в історичному місті Дубно, в зручній локації будується сучасна дев’яти поверхова новобудова.</p>
      <p>
        24 ергономічні планування та 96 квартир класу "comfort plus",від 40 m². Обирай готове планування, або плануй
        свою оселю на власний розсуд, щоб тобі було затишно та комфортно.
      </p>
      <UnmountClosed isOpened={isOpened} initialStyle={{ height: 0, overflow: "hidden" }}>
        <p>Тобі не доведеться обирати щось одне бо все, що потрібно вже є в ЖК SVIY.</p>
        <p>
          Тобі лишається лише спланувати свій час, щоб насолоджуватись ранковою кавою і милуватись краєвидами з
          панорамних вікон.
        </p>
        <p>
          Відпочивати у власному подвір'ї, де малеча бавиться на сучасному дитячому майданчику, а ти прогулюєшся
          зеленими алеями.
        </p>
        <p>
          Неспішно збиратися на роботу зранку, бо не має куди поспішати - твоє авто у підземному паркінгу, школа і
          садочок поруч.
        </p>
        <p>Ходити в супермаркет, ресторан чи кінотеатр коли заманеться, бо все в пішій доступності.</p>
        <p>Бути впевненим у безпеці близьких бо доступ до будинку лише у "своїх", а відеоспостереження працює 24/7</p>
        <p>Кожна історія життя особлива. А якою буде твоя?</p>
        <p>Головне, щоб ти відчував себе вдома, бо тут ти SVIY.</p>
      </UnmountClosed>
      <button
        type="button"
        onClick={() => setIsOpened((prev) => !prev)}
        className="mx-auto flex flex-row items-center gap-2 text-base outline-none"
      >
        {isOpened ? "Сховати" : "Розгорнути"}
        <ChevronDown className={twMerge("duration-300", isOpened && "rotate-180")} />
      </button>
    </div>
  );
}
