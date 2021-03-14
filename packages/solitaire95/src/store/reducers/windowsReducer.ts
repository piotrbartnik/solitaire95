export interface WindowsState {
  cardBackWindowState: boolean;
  aboutWindowState: boolean;
}

interface WindowActionTypes {
  type: string;
  cardBackWindowState: boolean;
  aboutWindowState: boolean;
}

const initialState: WindowsState = {
  cardBackWindowState: false,
  aboutWindowState: false,
};

export const toggleWindows = (
  state = initialState,
  action: WindowActionTypes
): WindowsState => {
  switch (action.type) {
    case "TOGGLE_CARDBACK_WINDOW":
      return { ...state, cardBackWindowState: action.cardBackWindowState };
    case "TOGGLE_ABOUT_WINDOW":
      return { ...state, aboutWindowState: action.aboutWindowState };
    default:
      return state;
  }
};
