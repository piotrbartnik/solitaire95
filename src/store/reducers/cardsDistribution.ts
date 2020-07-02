import { cardTypes } from "../../configs/cardTypes";

type initialState = {
  cardsOnPile: string[];
  cardsFromPile: string[];
  firstStack: string[];
  secondStack: string[];
  thirdStack: string[];
  fourthStack: string[];
  fifthStack: string[];
  destinationFirst: string[];
  destinationSecond: string[];
  destinationThird: string[];
  destinationFourth: string[];
};

const initialState: initialState = {
  cardsOnPile: cardTypes,
  cardsFromPile: [],
  firstStack: [],
  secondStack: [],
  thirdStack: [],
  fourthStack: [],
  fifthStack: [],
  destinationFirst: [],
  destinationSecond: [],
  destinationThird: [],
  destinationFourth: [],
};

export const cardDistribution = (state = initialState, action: any) => {
  switch (action.type) {
    case "TAKE_ONE_FROM_PILE":
      return { ...state, cardsFromPile: [...state.cardsFromPile, action.card] };
    case "REVERSE_PILE":
      return { ...state, cardsOnPile: action.reversePile, cardsFromPile: [] };
    default:
      return state;
  }
};
