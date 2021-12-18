const cardRank = [
  "ace",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "jack",
  "queen",
  "king",
] as const;

export type CardNameType = typeof cardRank;

export type cardConfigType = [
  CardNameType,
  "clubs" | "spades" | "hearts" | "diamonds",
  undefined | boolean,
  "black" | "red",
  number | string
];

const cardConfigTypes: [
  "clubs" | "spades" | "hearts" | "diamonds",
  undefined | boolean,
  "black" | "red"
][] = [
  ["clubs", undefined, "black"],
  ["spades", undefined, "black"],
  ["hearts", undefined, "red"],
  ["diamonds", undefined, "red"],
];

export const createCards = cardRank
  .map((rank) =>
    cardConfigTypes.map((config) => [
      rank,
      ...config,
      cardRank.indexOf(rank).toString(),
    ])
  )
  .reduce(
    (cards, createdCards) => cards.concat(createdCards as cardConfigType[]),
    [] as cardConfigType[]
  );
