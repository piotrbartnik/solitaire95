import * as actionTypes from "./actionTypes";

export const toggleCardBackWindow = (cardBackWindowState: boolean) => {
  return {
    type: actionTypes.TOGGLE_WINDOW,
    cardBackWindowState: cardBackWindowState,
  };
};
