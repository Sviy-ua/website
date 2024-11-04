interface Specification {
  icon: string;
  title: string;
  description: string[];
}

const specifications: Specification[] = [
  {
    icon: "specification/building",
    title: "ТЕХНОЛОГІЯ БУДІВНИЦТВА",
    description: ["Монолітно-каркасне", "Бетон власного виробництва"],
  },
  {
    icon: "specification/external-design",
    title: "ЗОВНІШНЄ ОЗДОБЛЕННЯ",
    description: ["Мокрий фасад", "Склопрозорі конструкції"],
  },
  {
    icon: "specification/external-walls",
    title: "СТІНИ ЗОВНІШНІ",
    description: ["Газоблок 300мм"],
  },
  {
    icon: "specification/internal-walls",
    title: "СТІНИ ВНУТРІШНІ",
    description: ["Міжквартирні - газоблок 250мм", "Міжкімнатні - газоблок 100мм"],
  },
  {
    icon: "specification/warming",
    title: "УТЕПЛЕННЯ - комбіноване",
    description: ["Мінвата та пінопласт"],
  },
  {
    icon: "specification/condition",
    title: "СТАН КВАРТИРИ",
    description: ["Без оздоблення"],
  },
  {
    icon: "specification/height",
    title: "ВИСОТА СТЕЛІ В КВАРТИРАХ",
    description: ["2,80 м"],
  },
  {
    icon: "specification/heating",
    title: "ОПАЛЕННЯ",
    description: ["Індивідуальне газове"],
  },
  {
    icon: "specification/glass",
    title: "СКЛІННЯ",
    description: ["Гартоване, панорамне", "власного виробництва"],
  },
  {
    icon: "specification/elevator",
    title: "ЛІФТИ",
    description: ["Ліфт у кожному під'їзді"],
  },
  {
    icon: "specification/mzk",
    title: "СТАН МЗК",
    description: ["декоративне оздоблення"],
  },
  {
    icon: "specification/parking",
    title: "ПАРКІНГ",
    description: ["Підземний з пасажирським ліфтом", "Наземний гостьовий", "Зарядки для електроавтомобілів"],
  },
  {
    icon: "specification/commercial",
    title: "КОМЕРЦІЙНІ ПРИМІЩЕННЯ",
    description: ["На 1-му поверсі"],
  },
  {
    icon: "specification/roof",
    title: "ДАХ",
    description: ["Інверсійна покрівля"],
  },
  {
    icon: "specification/conditioning",
    title: "КОНДИЦІОНУВАННЯ",
    description: ["Загальна система відведення конденсату"],
  },
];

export default specifications;
