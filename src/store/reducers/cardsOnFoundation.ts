interface foundationState {
  [key: string]: undefined | string[];
}

type initialState = {
  [key: string]: foundationState;
};

const initialState: initialState = {
  cardsOnFirstFoundation: { foundationSuite: undefined, cards: [] },
  cardsOnSecondFoundation: { foundationSuite: undefined, cards: [] },
  cardsOnThirdFoundation: { foundationSuite: undefined, cards: [] },
  cardsOnFourthFoundation: { foundationSuite: undefined, cards: [] },
};

const immutableCardsArray = (
  state: initialState,
  action: any,
  foundation: string
) => {
  const cardsArray = state[foundation].cards?.slice();
  cardsArray?.splice(cardsArray.length, 0, action.addCardToFoundation);
  return cardsArray;
};

const cardsOnFoundationActionReturn = (
  state: initialState,
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

export const cardsOnFoundation = (state = initialState, action: any) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
