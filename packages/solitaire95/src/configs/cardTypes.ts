export type cardConfigType = [
  string,
  string,
  undefined | boolean,
  string,
  number | string
];

const cardRank: string[] = [
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

const cardConfigTypes: (string | undefined)[][] = [
  ["clubs", undefined, "black"],
  ["spades", undefined, "black"],
  ["hearts", undefined, "red"],
  ["diamonds", undefined, "red"],
];

export const createCards: (
  | string
  | undefined
  | number
)[][] = cardRank
  .map((rank) =>
    cardConfigTypes.map((config) => [
      rank,
      ...config,
      cardRank.indexOf(rank).toString(),
    ])
  )
  .reduce((a, b) => a.concat(b), []);
