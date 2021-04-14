export interface TimeState {
  time: number;
}

interface TimeActionTypes {
  type: string;
  timeToSave: number;
}

const initialState: TimeState = {
  time: 0,
};

export const timeCounter = (
  state = initialState,
  action: TimeActionTypes
): TimeState => {
  switch (action.type) {
    case "SAVE_TIME":
      return { ...state, time: action.timeToSave };
    case "RESET_TIME":
      return { ...state, time: 0 };
    default:
      return state;
  }
};
