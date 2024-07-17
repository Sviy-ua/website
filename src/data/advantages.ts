interface Advantage {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const advantages: Advantage[] = [
  {
    id: 1,
    icon: "advantage/comfort",
    title: "КВАРТИРИ COMFORT PLUS",
    description: "Ергономічні 1 та 2 кімнатні квартири",
  },
  {
    id: 2,
    icon: "advantage/glass",
    title: "СКЛІННЯ",
    description: "Гартоване панорамне скління",
  },
  {
    id: 3,
    icon: "advantage/free-plan",
    title: "ВІЛЬНЕ ПЛАНУВАННЯ",
    description: "Комфортабельні квартири з вільним плануванням",
  },
  {
    id: 4,
    icon: "advantage/heating",
    title: "ОПАЛЕННЯ",
    description: "Незалежність від центральної опалювальної системи",
  },
  {
    id: 5,
    icon: "advantage/location",
    title: "ЗРУЧНА ЛОКАЦІЯ",
    description: "В 5 хвилинах від центру міста",
  },
  {
    id: 6,
    icon: "advantage/parking",
    title: "ПАРКІНГ",
    description: "Підземний паркінг у власному будинку з пасажирським ліфтом",
  },
  {
    id: 7,
    icon: "advantage/area",
    title: "ПРОСТІР",
    description: "Сучасний простір для розваг та відпочинку з дизайнерським оздобленням",
  },
  {
    id: 8,
    icon: "advantage/safe",
    title: "БЕЗПЕКА",
    description: "Система відеоспостереження та контролю доступу",
  },
  {
    id: 9,
    icon: "advantage/elevator",
    title: "ЛІФТИ",
    description: "Безшумний ліфт у кожному під'їзді",
  },
  {
    id: 10,
    icon: "advantage/commercial",
    title: "КОМЕРЦІЙНІ ПРИМІЩЕННЯ",
    description: "1 поверх",
  },
];

export default advantages;
