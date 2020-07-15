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

export const cardsOnFoundation = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_CARD_TO_FIRST_FOUNDATION":
      const cardsArray = state.cardsOnFirstFoundation.cards?.slice();
      cardsArray?.splice(cardsArray.length, 0, action.addCardToFoundation);
      return {
        ...state,
        cardsOnFirstFoundation: {
          ...state.cardsOnFirstFoundation,
          foundationColor: action.addFoundationColor,
          cards: cardsArray,
        },
      };
    case "ADD_CARD_TO_SECOND_FOUNDATION":
      const cardsArray2 = state.cardsOnSecondFoundation.cards?.slice();
      cardsArray2?.splice(cardsArray2.length, 0, action.addCardToFoundation);
      return {
        ...state,
        cardsOnSecondFoundation: {
          ...state.cardsOnSecondFoundation,
          foundationColor: action.addFoundationColor,
          cards: cardsArray2,
        },
      };
    case "ADD_CARD_TO_THIRD_FOUNDATION":
      const cardsArray3 = state.cardsOnThirdFoundation.cards?.slice();
      cardsArray3?.splice(cardsArray3.length, 0, action.addCardToFoundation);
      return {
        ...state,
        cardsOnThirdFoundation: {
          ...state.cardsOnThirdFoundation,
          foundationColor: action.addFoundationColor,
          cards: cardsArray3,
        },
      };
    case "ADD_CARD_TO_FOURTH_FOUNDATION":
      const cardsArray4 = state.cardsOnFourthFoundation.cards?.slice();
      cardsArray4?.splice(cardsArray4.length, 0, action.addCardToFoundation);
      return {
        ...state,
        cardsOnFourthFoundation: {
          ...state.cardsOnFourthFoundation,
          foundationColor: action.addFoundationColor,
          cards: cardsArray4,
        },
      };
    default:
      return state;
  }
};
