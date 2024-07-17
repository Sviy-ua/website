export type Apartament = {
  id: string;
  roomsCount: number;
  section: number;
  rooms: string;
  area: number;
};

const apartaments: Apartament[] = [
  {
    id: "1k-standart",
    roomsCount: 1,
    section: 1,
    rooms: "203-803",
    area: 55.4,
  },
  {
    id: "1k-kitchen",
    roomsCount: 1,
    section: 1,
    rooms: "211-811",
    area: 40.9,
  },
  {
    id: "2k-standart",
    roomsCount: 2,
    section: 1,
    rooms: "201-801",
    area: 47.4,
  },
  {
    id: "2k-alternative",
    roomsCount: 2,
    section: 1,
    rooms: "209-809",
    area: 63.5,
  },
  {
    id: "3k-standart",
    roomsCount: 3,
    section: 1,
    rooms: "209-809",
    area: 63.5,
  },
];

export default apartaments;
