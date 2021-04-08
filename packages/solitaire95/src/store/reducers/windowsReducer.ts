export interface WindowsState {
  cardBackWindow: boolean;
  aboutWindow: boolean;
  optionsWindow: boolean;
}

interface WindowActionTypes {
  type: string;
  windowState: boolean;
  windowToToggle: string;
}

const initialState: WindowsState = {
  cardBackWindow: false,
  aboutWindow: false,
  optionsWindow: false,
};

export const toggleWindows = (
  state = initialState,
  action: WindowActionTypes
): WindowsState => {
  switch (action.type) {
    case "TOGGLE_WINDOW":
      return { ...state, [action.windowToToggle]: action.windowState };
    default:
      return state;
  }
};
