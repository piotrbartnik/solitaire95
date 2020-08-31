import { cardTypes } from "../../configs/cardTypes";

type initialState = {
  cardsOnStock: string[];
  cardsFromStock: string[];
  cardsOnPiles: { [key: string]: string[] };
};

const mixCardsForGame = (cards: string[]): string[][] => {
  const randomizeCardInput = cards.sort(() => Math.random() - 0.5);
  const cardsForStock = randomizeCardInput.slice(0, 24);
  const cardsForPiles = randomizeCardInput.slice(24);
  return [cardsForStock, cardsForPiles];
};

const [cardsForStock, cardsForPiles] = mixCardsForGame(cardTypes);

const orderPiles = (cardsForPiles: string[]): { [key: string]: string[] } => {
  const cardsOnPiles = {};
  cardsForPiles.forEach((el, index) => {
    if (index < 7) {
      const triangularSequenceDividend = index * (index + 1);
      Object.assign(cardsOnPiles, {
        [index]: cardsForPiles.slice(
          triangularSequenceDividend / 2,
          triangularSequenceDividend / 2 + index + 1
        ),
      });
    }
  });
  return cardsOnPiles;
};

const testPilesConfig: { [key: string]: string[] } = {
  0: ["twoOfHearts"],
  1: ["threeOfSpades"],
  2: ["fourOfHearts"],
  3: ["fiveOfSpades"],
  4: ["sixOfHearts"],
  5: ["sevenOfSpades"],
  6: ["eigthOfHearts"],
  7: ["nineOfSpades", "nineOfClubs"],
};
const initialState: initialState = {
  cardsOnStock: cardsForStock,
  cardsFromStock: [],
  cardsOnPiles: orderPiles(cardsForPiles),
};

export const cardDistribution = (state = initialState, action: any) => {
  switch (action.type) {
    case "TAKE_ONE_FROM_STOCK":
      return {
        ...state,
        cardsFromStock: [...state.cardsFromStock, action.card],
      };
    case "REVERSE_STOCK":
      return {
        ...state,
        cardsOnStock: action.reverseStock,
        cardsFromStock: [],
      };
    case "REMOVE_CARD_MOVED_TO_FOUNDATION":
      return {
        ...state,
        cardsFromStock: action.removeCardMovedToFoundation,
      };
    case "REMOVE_CARD_FROM_PILE":
      return {
        ...state,
        cardsOnPiles: {
          ...state.cardsOnPiles,
          [action.removeCardFromPile]: state.cardsOnPiles[
            action.removeCardFromPile
          ].slice(0, -1),
        },
      };
    case "ADD_CARD_TO_PILE":
      return {
        ...state,
        cardsOnPiles: {
          ...state.cardsOnPiles,
          [action.addCardToPile]: state.cardsOnPiles[
            action.addCardToPile
          ].concat([action.cardToAdd]),
        },
      };
    default:
      return state;
  }
};
