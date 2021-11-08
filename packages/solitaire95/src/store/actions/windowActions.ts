import * as actionTypes from "./actionTypes";

export type ToggleWindowType = (
  windowState: boolean,
  windowToToggle: string
) => { type: "TOGGLE_WINDOW"; windowState: boolean; windowToToggle: string };

export const toggleWindow: ToggleWindowType = (
  windowState,
  windowToToggle
) => ({
  type: actionTypes.TOGGLE_WINDOW,
  windowState,
  windowToToggle,
});
