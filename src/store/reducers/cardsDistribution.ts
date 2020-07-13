import { cardTypes } from "../../configs/cardTypes";

type initialState = {
  cardsOnStock: string[];
  cardsFromStock: string[];
};

const initialState: initialState = {
  cardsOnStock: cardTypes,
  cardsFromStock: [],
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
