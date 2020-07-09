import { cardTypes } from "../../configs/cardTypes";

type initialState = {
  cardsOnPile: string[];
  cardsFromPile: string[];
};

const initialState: initialState = {
  cardsOnPile: cardTypes,
  cardsFromPile: [],
};

export const cardDistribution = (state = initialState, action: any) => {
  switch (action.type) {
    case "TAKE_ONE_FROM_PILE":
      return { ...state, cardsFromPile: [...state.cardsFromPile, action.card] };
    case "REVERSE_PILE":
      return { ...state, cardsOnPile: action.reversePile, cardsFromPile: [] };
    case "MOVE_TO_DESTINATION":
      return {
        ...state,
        cardsFromPile: action.removeCardMovedToDestinationPile,
      };
    default:
      return state;
  }
};
