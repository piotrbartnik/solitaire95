import { cardConfigType } from "../../configs/cardTypes";
export interface FoundationState {
  foundationSuite: string | undefined;
  cards: cardConfigType[];
}

export interface CardsOnFoundationActionReturnActionTypes {
  type: string;
  addFoundationColor: string;
  addCardToFoundation: cardConfigType;
  removeCardFromFoundation: number;
  foundationState: { [key: string]: FoundationState };
}

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
  action: CardsOnFoundationActionReturnActionTypes,
  foundation: string
) => {
  const cardsArray = state[foundation].cards?.slice();
  cardsArray?.splice(cardsArray.length, 0, action.addCardToFoundation);
  return cardsArray;
};

const cardsOnFoundationActionReturn = (
  state: FoundationInitialState,
  action: CardsOnFoundationActionReturnActionTypes,
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
    case "DEAL_CARDS":
      return initialState;
    case "ADD_CARD_TO_FIRST_FOUNDATION":
      return cardsOnFoundationActionReturn(
        state,
        action,
        "cardsOnFirstFoundation"
      );
    case "ADD_CARD_TO_SECOND_FOUNDATION":
      return cardsOnFoundationActionReturn(
        state,
        action,
        "cardsOnSecondFoundation"
      );
    case "ADD_CARD_TO_THIRD_FOUNDATION":
      return cardsOnFoundationActionReturn(
        state,
        action,
        "cardsOnThirdFoundation"
      );
    case "ADD_CARD_TO_FOURTH_FOUNDATION":
      return cardsOnFoundationActionReturn(
        state,
        action,
        "cardsOnFourthFoundation"
      );
    case "REMOVE_CARD_FROM_FOUNDATION":
      // eslint-disable-next-line no-case-declarations
      const cardsOnFoundation = state[
        foundations[action.removeCardFromFoundation]
      ].cards.slice();
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
    case "UNDO_MOVE_FROM_STOCK_TO_FOUNDATION":
      return {
        ...action.foundationState,
      };
    case "UNDO_MOVE_FROM_PILE_TO_FOUNDATION":
      return {
        ...action.foundationState,
      };
    case "UNDO_MOVE_FROM_FOUNDATION_TO_PILE":
      return {
        ...action.foundationState,
      };
    default:
      return state;
  }
};
