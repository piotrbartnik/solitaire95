export const cardTypes: string[] = [
  "aceOfHearts",
  "twoOfHearts",
  "threeOfHearts",
  "fourOfHearts",
  "fiveOfHearts",
  "sixOfHearts",
  "sevenOfHearts",
  "eigthOfHearts",
  "nineOfHearts",
  "tenOfHearts",
  "jackOfHearts",
  "queenOfHearts",
  "kingOfHearts",
  "aceOfSpades",
  "twoOfSpades",
  "threeOfSpades",
  "fourOfSpades",
  "fiveOfSpades",
  "sixOfSpades",
  "sevenOfSpades",
  "eigthOfSpades",
  "nineOfSpades",
  "tenOfSpades",
  "jackOfSpades",
  "queenOfSpades",
  "kingOfSpades",
  "aceOfDiamonds",
  "twoOfDiamonds",
  "threeOfDiamonds",
  "fourOfDiamonds",
  "fiveOfDiamonds",
  "sixOfDiamonds",
  "sevenOfDiamonds",
  "eigthOfDiamonds",
  "nineOfDiamonds",
  "tenOfDiamonds",
  "jackOfDiamonds",
  "queenOfDiamonds",
  "kingOfDiamonds",
  "aceOfClubs",
  "twoOfClubs",
  "threeOfClubs",
  "fourOfClubs",
  "fiveOfClubs",
  "sixOfClubs",
  "sevenOfClubs",
  "eigthOfClubs",
  "nineOfClubs",
  "tenOfClubs",
  "jackOfClubs",
  "queenOfClubs",
  "kingOfClubs",
];

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
