import { cardConfigType } from "../../configs/cardTypes";

export interface CardsDistributionInitialState {
  cardsOnStock: cardConfigType[];
  cardsFromStock: cardConfigType[];
  cardsOnPiles: { [key: string]: cardConfigType[] };
}

export interface CardDistributionActionTypes {
  type: string;
  cardsOnPiles: { [key: string]: cardConfigType[] };
  cardsForStock: cardConfigType[];
  card: cardConfigType;
  reverseStock: cardConfigType[];
  removeCardFromStock: cardConfigType[];
  removeCardFromPile: number;
  cardToPile: cardConfigType;
  addCardToPile: number;
}

const initialState: CardsDistributionInitialState = {
  cardsOnStock: [],
  cardsFromStock: [],
  cardsOnPiles: {},
};

export const cardDistribution = (
  state = initialState,
  action: CardDistributionActionTypes
): CardsDistributionInitialState => {
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
    case "REMOVE_CARD_FROM_STOCK":
      return {
        ...state,
        cardsFromStock: action.removeCardFromStock,
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
      // eslint-disable-next-line no-case-declarations
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
