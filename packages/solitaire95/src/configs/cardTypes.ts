export type CardNameType =
  | "ace"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine"
  | "ten"
  | "jack"
  | "queen"
  | "king";
export type CardSuiteType = "clubs" | "spades" | "hearts" | "diamonds";
export type CardColorType = "black" | "red";

export type cardConfigType = [
  CardNameType,
  CardSuiteType,
  undefined | boolean,
  CardColorType,
  number | string
];

const cardRank: CardNameType[] = [
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
];

const cardConfigTypes: [CardSuiteType, undefined | boolean, CardColorType][] = [
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
