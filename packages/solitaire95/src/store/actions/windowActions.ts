import { ACTION_TYPES } from "./actionTypes";

export type ToggleWindowType = (
  windowState: boolean,
  windowToToggle: string
) => {
  type: ACTION_TYPES.TOGGLE_WINDOW;
  windowState: boolean;
  windowToToggle: string;
};

export const toggleWindow: ToggleWindowType = (
  windowState,
  windowToToggle
) => ({
  type: ACTION_TYPES.TOGGLE_WINDOW,
  windowState,
  windowToToggle,
});
