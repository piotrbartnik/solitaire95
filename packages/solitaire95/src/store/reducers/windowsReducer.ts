import {
  ToggleWindowReducerType,
  ACTION_TYPES,
  WindowTypes,
} from "../actions/actionTypes";

export type WindowsState = {
  [key in WindowTypes]: boolean;
};

const initialState: WindowsState = {
  cardBackWindow: false,
  aboutWindow: false,
  optionsWindow: false,
  dealAgainWindow: false,
  helpTopicsWindow: true,
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
