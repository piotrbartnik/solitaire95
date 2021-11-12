import { cardConfigType } from "../../configs/cardTypes";
import {
  ACTION_TYPES,
  UndoMoveFromStockToFoundationTypeReducer,
  UndoMoveFromPileToFoundationTypeReducer,
  UndoMoveFromFoundationToPilesTypeReducer,
  AddCardToFoundationTypeReducer,
  RemoveCardFromStockTypeReducer,
  RemoveCardFromPileTypeReducer,
  AddCardToPileTypeReducer,
  RemoveCardFromFoundationTypeReducer,
  CardDealTypeReducer,
} from "../actions/actionTypes";
export interface FoundationState {
  foundationSuite: string | undefined;
  cards: cardConfigType[];
}

export type CardsOnFoundationActionReturnActionTypes =
  | UndoMoveFromStockToFoundationTypeReducer
  | UndoMoveFromPileToFoundationTypeReducer
  | UndoMoveFromFoundationToPilesTypeReducer
  | AddCardToFoundationTypeReducer
  | RemoveCardFromStockTypeReducer
  | RemoveCardFromPileTypeReducer
  | AddCardToPileTypeReducer
  | RemoveCardFromFoundationTypeReducer
  | CardDealTypeReducer;
export interface FoundationInitialState {
  [key: string]: FoundationState;
}

const initialState: FoundationInitialState = {
  cardsOnFirstFoundation: { foundationSuite: undefined, cards: [] },
  cardsOnSecondFoundation: { foundationSuite: undefined, cards: [] },
  cardsOnThirdFoundation: { foundationSuite: undefined, cards: [] },
  cardsOnFourthFoundation: { foundationSuite: undefined, cards: [] },
};

const immutableCardsArray = (
  state: FoundationInitialState,
  action: AddCardToFoundationTypeReducer,
  foundation: string
) => {
  const cardsArray = state[foundation].cards?.slice();
  cardsArray?.splice(cardsArray.length, 0, action.addCardToFoundation);
  return cardsArray;
};

const cardsOnFoundationActionReturn = (
  state: FoundationInitialState,
  action: AddCardToFoundationTypeReducer,
  foundation: string
): {
  [key: string]: FoundationState;
} => ({
  ...state,
  [foundation]: {
    ...state[foundation],
    foundationSuite: action.addFoundationColor
      ? action.addFoundationColor
      : state[foundation].foundationSuite,
    cards: immutableCardsArray(state, action, foundation),
  },
});

const foundations = [
  "cardsOnFirstFoundation",
  "cardsOnSecondFoundation",
  "cardsOnThirdFoundation",
  "cardsOnFourthFoundation",
];

export const cardsOnFoundation = (
  state = initialState,
  action: CardsOnFoundationActionReturnActionTypes
): {
  [key: string]: FoundationState;
} => {
  switch (action.type) {
    case ACTION_TYPES.DEAL_CARDS:
      return initialState;
    case ACTION_TYPES.ADD_CARD_TO_FIRST_FOUNDATION:
      return cardsOnFoundationActionReturn(
        state,
        action,
        "cardsOnFirstFoundation"
      );
    case ACTION_TYPES.ADD_CARD_TO_SECOND_FOUNDATION:
      return cardsOnFoundationActionReturn(
        state,
        action,
        "cardsOnSecondFoundation"
      );
    case ACTION_TYPES.ADD_CARD_TO_THIRD_FOUNDATION:
      return cardsOnFoundationActionReturn(
        state,
        action,
        "cardsOnThirdFoundation"
      );
    case ACTION_TYPES.ADD_CARD_TO_FOURTH_FOUNDATION:
      return cardsOnFoundationActionReturn(
        state,
        action,
        "cardsOnFourthFoundation"
      );
    case ACTION_TYPES.REMOVE_CARD_FROM_FOUNDATION:
      // eslint-disable-next-line no-case-declarations
      const cardsOnFoundation =
        state[foundations[action.removeCardFromFoundation]].cards.slice();
      cardsOnFoundation?.pop();
      return {
        ...state,
        [foundations[action.removeCardFromFoundation]]: {
          cards: cardsOnFoundation,
          foundationSuite: cardsOnFoundation?.length
            ? state[foundations[action.removeCardFromFoundation]]
                .foundationSuite
            : undefined,
        },
      };
    case ACTION_TYPES.UNDO_MOVE_FROM_STOCK_TO_FOUNDATION:
      return {
        ...action.foundationState,
      };
    case ACTION_TYPES.UNDO_MOVE_FROM_PILE_TO_FOUNDATION:
      return {
        ...action.foundationState,
      };
    case ACTION_TYPES.UNDO_MOVE_FROM_FOUNDATION_TO_PILE:
      return {
        ...action.foundationState,
      };
    default:
      return state;
  }
};
