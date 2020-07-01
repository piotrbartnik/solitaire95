const initialState = {
  testBoolean: false,
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "CHANGE_BOOLEAN":
      return { ...state, testBoolean: action.testBoolean };
    case "CHANGE_BOOLEAN_TO_STRING":
      return { ...state, testBoolean: action.testBoolean };
    default:
      return state;
  }
};

export { rootReducer };
