type initialState = {
  cardsOnFirstFoundation: string[];
  cardsOnSecondFoundation: string[];
  cardsOnThirdFoundation: string[];
  cardsOnFourthFoundation: string[];
};

const initialState: initialState = {
  cardsOnFirstFoundation: [],
  cardsOnSecondFoundation: [],
  cardsOnThirdFoundation: [],
  cardsOnFourthFoundation: [],
};

export const cardsOnFoundation = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_CARD_TO_FIRST_FOUNDATION":
      return {
        ...state,
        cardsOnFirstFoundation: [
          ...state.cardsOnFirstFoundation,
          action.addCardToFoundation,
        ],
      };
    case "ADD_CARD_TO_SECOND_FOUNDATION":
      return {
        ...state,
        cardsOnSecondFoundation: [
          ...state.cardsOnSecondFoundation,
          action.addCardToFoundation,
        ],
      };
    case "ADD_CARD_TO_THIRD_FOUNDATION":
      return {
        ...state,
        cardsOnThirdFoundation: [
          ...state.cardsOnThirdFoundation,
          action.addCardToFoundation,
        ],
      };
    case "ADD_CARD_TO_FOURTH_FOUNDATION":
      return {
        ...state,
        cardsOnFourthFoundation: [
          ...state.cardsOnFourthFoundation,
          action.addCardToFoundation,
        ],
      };
    default:
      return state;
  }
};
