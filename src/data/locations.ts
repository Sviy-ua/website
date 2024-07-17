export interface ILocationData {
  title: string;
  walk?: number | string;
  car: number | string;
}

export interface ILocationCategory {
  title: string;
  locations: ILocationData[];
}

const locations: ILocationCategory[] = [
  {
    title: "ЩО ПОРУЧ",
    locations: [
      {
        title: "Супермаркет, будівельний магазин",
        walk: 6,
        car: 1,
      },
      {
        title: "Аптека, ветаптека",
        walk: 6,
        car: 1,
      },
      {
        title: "Кав'ярні, кінотеатр",
        walk: 10,
        car: 2,
      },
      {
        title: "Нова пошта, Укр пошта",
        walk: 15,
        car: 5,
      },
      {
        title: "Фітнес-клуб, спортзал",
        walk: 20,
        car: 8,
      },
    ],
  },
  {
    title: "ТРАНСПОРТ",
    locations: [
      {
        title: "Автобусна зупинка",
        walk: 5,
        car: 1,
      },
      {
        title: "Залізнична станція",
        walk: 16,
        car: 6,
      },
      {
        title: "Автовокзал",
        walk: 20,
        car: 8,
      },
    ],
  },
  {
    title: "ДОДАТКОВІ ЛОКАЦІЇ",
    locations: [
      {
        title: "Стадіон (р-н Механічний)",
        walk: 14,
        car: 4,
      },
    ],
  },
  {
    title: "РОЗВАГИ ТА РЕЛАКС",
    locations: [
      {
        title: '"Робінзон" - ГО рибалок',
        walk: 22,
        car: 9,
      },
      {
        title: 'Аквапарк, відпочинковий комплекс "Софія"',
        car: 25,
      },
      {
        title: 'Готельно-розважальний комплекс "Golden Lion"',
        car: 23,
      },
      {
        title: '"Кар\'єри" - зони для відпочинку на березі ставка',
        walk: 15,
        car: 5,
      },
      {
        title: "Дубенський замок",
        walk: 29,
        car: 12,
      },
    ],
  },
  {
    title: "МЕДИЧНІ ТА НАВЧАЛЬНІ ЗАКЛАДИ",
    locations: [
      {
        title: "Лабораторія, лікарні, офтальмологічна клініка",
        walk: 23,
        car: 9,
      },
      {
        title: "Дитячий садок",
        walk: "13-15",
        car: "3-5",
      },
      {
        title: "Спортшкола",
        walk: 15,
        car: 5,
      },
      {
        title: 'Сучасна приватна школа "Премудрість"',
        walk: 20,
        car: 8,
      },
    ],
  },
];

export default locations;
