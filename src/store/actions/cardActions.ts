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
    type: actionTypes.ADD_CARD_TO_FOUNDATION,
    addCardToFoundation: payload,
  };
};

export const removeCardMovedToFoundation = (payload: string[]) => {
  return {
    type: actionTypes.REMOVE_CARD_MOVED_TO_FOUNDATION,
    removeCardMovedToFoundation: payload,
  };
};
