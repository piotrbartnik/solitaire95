interface WindowsState {
  cardBackWindowState: boolean;
}

interface WindowActionTypes {
  type: string;
  cardBackWindowState: boolean;
}

const initialState: WindowsState = {
  cardBackWindowState: false,
};

export const toggleWindows = (
  state = initialState,
  action: WindowActionTypes
): WindowsState => {
  switch (action.type) {
    case "TOGGLE_WINDOW":
      return { ...state, cardBackWindowState: action.cardBackWindowState };
    default:
      return state;
  }
};
