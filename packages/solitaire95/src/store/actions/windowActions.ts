import * as actionTypes from "./actionTypes";

export const toggleWindow = (
  windowState: boolean,
  windowToToggle: string
): { type: string; windowState: boolean; windowToToggle: string } => {
  return {
    type: actionTypes.TOGGLE_WINDOW,
    windowState,
    windowToToggle,
  };
};
