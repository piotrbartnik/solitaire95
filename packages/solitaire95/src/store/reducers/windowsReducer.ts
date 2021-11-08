import { ToggleWindowReducerType, ACTION_TYPES } from "../actions";

export type WindowsState = {
  cardBackWindow: boolean;
  aboutWindow: boolean;
  optionsWindow: boolean;
  dealAgainWindow: boolean;
};

const initialState: WindowsState = {
  cardBackWindow: false,
  aboutWindow: false,
  optionsWindow: false,
  dealAgainWindow: false,
};

export const toggleWindows = (
  state = initialState,
  action: ToggleWindowReducerType
): WindowsState => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_WINDOW:
      return { ...state, [action.windowToToggle]: action.windowState };
    default:
      return state;
  }
};
