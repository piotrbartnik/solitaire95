import { cardTypes } from "../../configs/cardTypes";

type initialState = {
  cardsOnStock: string[];
  cardsFromStock: string[];
  cardsOnPiles: object;
};

const mixCardsForGame = (cards: string[]): string[][] => {
  const randomizeCardInput = cards.sort(() => Math.random() - 0.5);
  const cardsForStock = randomizeCardInput.slice(0, 24);
  const cardsForPiles = randomizeCardInput.slice(24);
  return [cardsForStock, cardsForPiles];
};

const [cardsForStock, cardsForPiles] = mixCardsForGame(cardTypes);

const orderPiles = (cardsForPiles: string[]): object => {
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
        cardsOnPiles: {},
      };
    default:
      return state;
  }
};
