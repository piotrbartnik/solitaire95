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

export const cardsOnFirstFoundation = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_CARD_TO_FOUNDATION":
      return {
        ...state,
        cardsOnFirstFoundation: [
          ...state.cardsOnFirstFoundation,
          action.addCardToFoundation,
        ],
      };
    default:
      return state;
  }
};
