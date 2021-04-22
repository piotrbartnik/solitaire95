export interface TimeState {
  initialTime: number;
}

interface TimeActionTypes {
  type: string;
  timeToSave: number;
}

const initialState: TimeState = {
  initialTime: 0,
};

export const timeCounter = (
  state = initialState,
  action: TimeActionTypes
): TimeState => {
  switch (action.type) {
    case "SAVE_INITIAL_TIME":
      return { ...state, initialTime: action.timeToSave };
    case "RESET_TIME":
      return { ...state, initialTime: 0 };
    default:
      return state;
  }
};
