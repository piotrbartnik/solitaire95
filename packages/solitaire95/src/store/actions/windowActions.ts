import { ACTION_TYPES } from "./actionTypes";

export type WindowTypes =
  | "dealAgainWindow"
  | "aboutWindow"
  | "cardBackWindow"
  | "optionsWindow"
  | "helpTopicsWindow";

export type ToggleWindowReducerType = {
  type: ACTION_TYPES.TOGGLE_WINDOW;
  windowState: boolean;
  windowToToggle: WindowTypes;
};

export type ToggleWindowType = (
  windowState: boolean,
  windowToToggle: WindowTypes
) => ToggleWindowReducerType;

export const toggleWindow: ToggleWindowType = (
  windowState,
  windowToToggle
) => ({
  type: ACTION_TYPES.TOGGLE_WINDOW,
  windowState,
  windowToToggle,
});
