export interface WindowsState {
  cardBackWindow: boolean;
  aboutWindowState: boolean;
}

interface WindowActionTypes {
  type: string;
  windowState: boolean;
  aboutWindowState: boolean;
  windowToToggle: string;
}

const initialState: WindowsState = {
  cardBackWindow: false,
  aboutWindowState: false,
};

export const toggleWindows = (
  state = initialState,
  action: WindowActionTypes
): WindowsState => {
  switch (action.type) {
    case "TOGGLE_WINDOW":
      return { ...state, [action.windowToToggle]: action.windowState };
    case "TOGGLE_ABOUT_WINDOW":
      return { ...state, aboutWindowState: action.aboutWindowState };
    default:
      return state;
  }
};
