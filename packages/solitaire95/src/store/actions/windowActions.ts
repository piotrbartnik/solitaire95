import { ACTION_TYPES } from "./actionTypes";

export type ToggleWindowReducerType = {
  type: ACTION_TYPES.TOGGLE_WINDOW;
  windowState: boolean;
  windowToToggle: string;
};

export type ToggleWindowType = (
  windowState: boolean,
  windowToToggle: string
) => ToggleWindowReducerType;

export const toggleWindow: ToggleWindowType = (
  windowState,
  windowToToggle
) => ({
  type: ACTION_TYPES.TOGGLE_WINDOW,
  windowState,
  windowToToggle,
});
