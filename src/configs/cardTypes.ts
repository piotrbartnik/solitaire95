const cardRank: string[] = [
  "ace",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eighth",
  "nine",
  "ten",
  "jack",
  "queen",
  "king",
];

const cardConfigs: (string | undefined)[][] = [
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
    cardConfigs.map((config) => [rank, ...config, cardRank.indexOf(rank)])
  )
  .reduce((a, b) => a.concat(b), []);
