interface ISeo {
  [key: string]: {
    title?: string;
    description: string;
  };
}

const seo: ISeo = {
  home: {
    description: 'В зручній локації м. Дубно будується сучасна дев`ятиповерхова новобудова класу "comfort plus".',
  },
  building: {
    title: "Будівнитцво",
    description: "Слідкуйте за ходом будівництва ЖК SVIY: фото, відео та опис кожного етапу.",
  },
  contacts: {
    title: "Контакти",
    description: "Контакти ЖК SVIY: телефон, адреса офісу продажу, електронна пошта. Зв'яжіться з нами для деталей.",
  },
  apartaments: {
    title: "Квартири",
    description: "Обирай квартиру в ЖК SVIY: планування та вартість твого майбутнього житла.",
  },
};

export default seo;
