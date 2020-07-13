import * as actionTypes from "./actionTypes";

export const takeOneFromStock = (payload: string) => {
  return {
    type: actionTypes.TAKE_ONE_FROM_STOCK,
    card: payload,
  };
};

export const reverseStock = (payload: string[]) => {
  return {
    type: actionTypes.REVERSE_STOCK,
    reverseStock: payload,
  };
};

export const addCardToFirstFoundation = (payload: string[]) => {
  return {
    type: actionTypes.ADD_CARD_TO_FIRST_FOUNDATION,
    addCardToFoundation: payload,
  };
};
export const addCardToSecondFoundation = (payload: string[]) => {
  return {
    type: actionTypes.ADD_CARD_TO_SECOND_FOUNDATION,
    addCardToFoundation: payload,
  };
};
export const addCardToThirdFoundation = (payload: string[]) => {
  return {
    type: actionTypes.ADD_CARD_TO_THIRD_FOUNDATION,
    addCardToFoundation: payload,
  };
};
export const addCardToFourthFoundation = (payload: string[]) => {
  return {
    type: actionTypes.ADD_CARD_TO_FOURTH_FOUNDATION,
    addCardToFoundation: payload,
  };
};

export const removeCardMovedToFoundation = (payload: string[]) => {
  return {
    type: actionTypes.REMOVE_CARD_MOVED_TO_FOUNDATION,
    removeCardMovedToFoundation: payload,
  };
};
