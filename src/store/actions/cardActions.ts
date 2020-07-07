import * as actionTypes from "./actionTypes";

export const takeOneFromPile = (payload: string) => {
  return {
    type: actionTypes.TAKE_ONE_FROM_PILE,
    card: payload,
  };
};

export const reversePile = (payload: string[]) => {
  return {
    type: actionTypes.REVERSE_PILE,
    reversePile: payload,
  };
};

export const addCardToFirstDestinationPile = (payload: string[]) => {
  return {
    type: actionTypes.ADD_CARD_TO_DESTINATION_PILE,
    addCardToPile: payload,
  };
};
