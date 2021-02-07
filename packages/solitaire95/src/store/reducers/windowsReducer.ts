interface windowsState {
  cardBackWindowState: boolean;
}

interface windowActionTypes {
  type: string;
  cardBackWindowState: boolean;
}

const initialState: windowsState = {
  cardBackWindowState: false,
};

export const toggleWindows = (
  state = initialState,
  action: windowActionTypes
): windowsState => {
  switch (action.type) {
    case "TOGGLE_WINDOW":
      return { ...state, cardBackWindowState: action.cardBackWindowState };
    default:
      return state;
  }
};
