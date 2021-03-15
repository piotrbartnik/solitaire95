import * as actionTypes from "./actionTypes";

export const toggleWindow = (
  windowState: boolean,
  windowToClose: string
): { type: string; windowState: boolean; windowToClose: string } => {
  return {
    type: actionTypes.TOGGLE_WINDOW,
    windowState,
    windowToClose,
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
