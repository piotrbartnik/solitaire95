import * as actionTypes from "./actionTypes";

export const toggleCardBackWindow = (
  cardBackWindowState: boolean
): { type: string; cardBackWindowState: boolean } => {
  return {
    type: actionTypes.TOGGLE_WINDOW,
    cardBackWindowState: cardBackWindowState,
  };
};
