import { cardConfigType } from "../../configs/cardTypes";
export interface foundationState {
  [key: string]: undefined | cardConfigType[];
}

type initialFoundationState = {
  [key: string]: foundationState;
};

const initialState: initialFoundationState = {
  cardsOnFirstFoundation: { foundationSuite: undefined, cards: [] },
  cardsOnSecondFoundation: { foundationSuite: undefined, cards: [] },
  cardsOnThirdFoundation: { foundationSuite: undefined, cards: [] },
  cardsOnFourthFoundation: { foundationSuite: undefined, cards: [] },
};

const immutableCardsArray = (
  state: initialFoundationState,
  action: any,
  foundation: string
) => {
  const cardsArray = state[foundation].cards?.slice();
  cardsArray?.splice(cardsArray.length, 0, action.addCardToFoundation);
  return cardsArray;
};

const cardsOnFoundationActionReturn = (
  state: initialFoundationState,
  action: any,
  foundation: string
) => ({
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

export const cardsOnFoundation = (state = initialState, action: any) => {
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
      const cardsOnFoundation =
        state[foundations[action.removeCardFromFoundation]].cards;
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
    default:
      return state;
  }
};
