type initialState = {
  cardsOnFirstDesinationField: string[];
  cardsOnSecondDesinationField: string[];
  cardsOnThirdDesinationField: string[];
  cardsOnFourthDesinationField: string[];
};

const initialState: initialState = {
  cardsOnFirstDesinationField: [],
  cardsOnSecondDesinationField: [],
  cardsOnThirdDesinationField: [],
  cardsOnFourthDesinationField: [],
};

export const cardOnFirstDestinationField = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case "ADD_CARD_TO_DESTINATION_PILE":
      return {
        ...state,
        cardsOnFirstDesinationField: [
          ...state.cardsOnFirstDesinationField,
          action.addCardToPile,
        ],
      };
    default:
      return state;
  }
};
