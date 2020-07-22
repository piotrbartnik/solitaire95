interface foundationState {
  [key: string]: undefined | string[];
}

type initialState = {
  [key: string]: foundationState;
};

const initialState: initialState = {
  cardsOnFirstFoundation: { foundationColor: undefined, cards: [] },
  cardsOnSecondFoundation: { foundationColor: undefined, cards: [] },
  cardsOnThirdFoundation: { foundationColor: undefined, cards: [] },
  cardsOnFourthFoundation: { foundationColor: undefined, cards: [] },
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
    foundationColor: action.addFoundationColor
      ? action.addFoundationColor
      : state[foundation].foundationColor,
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
