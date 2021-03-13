import * as actionTypes from "./actionTypes";

export const toggleCardBackWindow = (
  cardBackWindowState: boolean
): { type: string; cardBackWindowState: boolean } => {
  return {
    type: actionTypes.TOGGLE_CARDBACK_WINDOW,
    cardBackWindowState: cardBackWindowState,
  };
};
export const toggleAboutWindow = (
  aboutWindowState: boolean
): { type: string; aboutWindowState: boolean } => {
  return {
    type: actionTypes.TOGGLE_ABOUT_WINDOW,
    aboutWindowState: aboutWindowState,
  };
};
