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
  for (let i = 0; i < 7; i++) {
    Object.assign(cardsOnPiles, {
      [i]: cardsForPiles.slice((i * (i + 1)) / 2, (i * (i + 1)) / 2 + i + 1),
    });
  }
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
    default:
      return state;
  }
};
