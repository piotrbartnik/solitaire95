interface windowsState {
  cardBackWindowState: boolean;
}

const initialState: windowsState = {
  cardBackWindowState: false,
};

export const toggleWindows = (state = initialState, action: any) => {
  switch (action.type) {
    case "TOGGLE_WINDOW":
      return { ...state, cardBackWindowState: action.cardBackWindowState };
    default:
      return state;
  }
};
