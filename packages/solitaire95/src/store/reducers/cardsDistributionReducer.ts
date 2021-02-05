import { cardConfigType } from "../../configs/cardTypes";

type initialState = {
  cardsOnStock: cardConfigType[];
  cardsFromStock: cardConfigType[];
  cardsOnPiles: { [key: string]: cardConfigType[] };
};

const initialState: initialState = {
  cardsOnStock: [],
  cardsFromStock: [],
  cardsOnPiles: {},
};

export const cardDistribution = (state = initialState, action: any) => {
  switch (action.type) {
    case "DEAL_CARDS":
      return {
        cardsOnStock: action.cardsForStock,
        cardsFromStock: [],
        cardsOnPiles: action.cardsOnPiles,
      };
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
      const cardAdded: cardConfigType[] = [action.cardToPile];
      return {
        ...state,
        cardsOnPiles: {
          ...state.cardsOnPiles,
          [action.addCardToPile]: state.cardsOnPiles[
            action.addCardToPile
          ].concat(cardAdded),
        },
      };
    default:
      return state;
  }
};
