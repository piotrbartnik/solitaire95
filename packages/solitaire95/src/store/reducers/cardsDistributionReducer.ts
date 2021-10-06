import { cardConfigType } from "../../configs/cardTypes";

export interface CardsDistributionInitialState {
  cardsOnStock: cardConfigType[];
  cardsFromStock: cardConfigType[];
  cardsOnPiles: { [key: string]: cardConfigType[] };
  threeCardsOnTable: cardConfigType[];
}

export interface CardDistributionActionTypes {
  type: string;
  cardsOnPiles: { [key: string]: cardConfigType[] };
  cardsForStock: cardConfigType[];
  cardsOnStock: cardConfigType[];
  cardToAddToTable: cardConfigType[] | cardConfigType;
  reverseStock: cardConfigType[];
  filteredCardsOnStock: cardConfigType[];
  removeCardFromPile: number;
  cardToPile: cardConfigType;
  addCardToPile: number;
  cardToTurn: number;
  cardsOnStockUndo: cardConfigType[];
  cardsFromStockUndo: cardConfigType[];
  threeCardsFromStockUndo: cardConfigType[];
  pilesState: { [key: string]: cardConfigType[] };
  cardsFromStockState: cardConfigType[];
  threeCardsOnTable: cardConfigType[];
  threeCardsOnStockFiltered: cardConfigType[];
}

const initialState: CardsDistributionInitialState = {
  cardsOnStock: [],
  cardsFromStock: [],
  threeCardsOnTable: [],
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
        threeCardsOnTable: [],
        cardsOnPiles: action.cardsOnPiles,
      };
    case "TAKE_ONE_FROM_STOCK":
      return {
        ...state,
        cardsFromStock: [
          ...state.cardsFromStock,
          action.cardToAddToTable as cardConfigType,
        ],
        cardsOnStock: action.cardsOnStock,
      };
    case "TAKE_THREE_FROM_STOCK":
      return {
        ...state,
        cardsFromStock: [
          ...state.cardsFromStock,
          ...(action.cardToAddToTable as cardConfigType[]),
        ],
        threeCardsOnTable: [...(action.threeCardsOnTable as cardConfigType[])],
        cardsOnStock: action.cardsOnStock,
      };
    case "REVERSE_STOCK":
      return {
        ...state,
        cardsOnStock: action.reverseStock,
        cardsFromStock: [],
        threeCardsOnTable: [],
      };
    case "REMOVE_CARD_FROM_STOCK":
      return {
        ...state,
        cardsFromStock: action.filteredCardsOnStock,
        threeCardsOnTable: action.threeCardsOnStockFiltered,
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
          [action.addCardToPile]:
            state.cardsOnPiles[action.addCardToPile].concat(cardAdded),
        },
      };
    case "TURN_CARD_ON_PILE":
      // eslint-disable-next-line no-case-declarations
      const newStateForPile = state.cardsOnPiles[action.cardToTurn];
      // eslint-disable-next-line no-case-declarations
      const mapState = newStateForPile.map((card, index) => {
        return index === newStateForPile.length - 1
          ? card.map((attribute) => {
              if (!attribute) {
                return true;
              }
              return attribute;
            })
          : card;
      });
      return {
        ...state,
        cardsOnPiles: {
          ...state.cardsOnPiles,
          [action.cardToTurn[0]]: mapState,
        },
      };
    case "UNDO_TAKE_ONE_FROM_STOCK":
      return {
        ...state,
        cardsOnStock: action.cardsOnStockUndo,
        cardsFromStock: action.cardsFromStockUndo,
      };
    case "UNDO_TAKE_THREE_FROM_STOCK":
      return {
        ...state,
        cardsOnStock: action.cardsOnStockUndo,
        threeCardsOnTable: action.threeCardsFromStockUndo,
        cardsFromStock: action.cardsFromStockUndo,
      };
    case "UNDO_REMOVE_FROM_PILE":
      return {
        ...state,
        cardsOnPiles: { ...action.pilesState },
      };
    case "UNDO_MOVE_FROM_STOCK_TO_PILE":
      return {
        ...state,
        cardsOnPiles: { ...action.pilesState },
        cardsFromStock: action.cardsFromStockState,
      };
    case "UNDO_MOVE_FROM_STOCK_TO_FOUNDATION":
      return {
        ...state,
        cardsFromStock: action.cardsFromStockState,
      };
    case "UNDO_MOVE_FROM_PILE_TO_FOUNDATION":
      return {
        ...state,
        cardsOnPiles: { ...action.pilesState },
      };
    case "UNDO_MOVE_FROM_FOUNDATION_TO_PILE":
      return {
        ...state,
        cardsOnPiles: { ...action.pilesState },
      };
    default:
      return state;
  }
};
