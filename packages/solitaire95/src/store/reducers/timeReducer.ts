import {
  TimeActionTypeReducer,
  SaveScoreTimeTypeReducer,
  SaveTimeTypeReducer,
  ACTION_TYPES,
} from "../actions/actionTypes";

export interface TimeState {
  initialTime: number;
  scoreTime: number;
}

const initialState: TimeState = {
  initialTime: 0,
  scoreTime: 0,
};

export const timeCounter = (
  state = initialState,
  action: SaveScoreTimeTypeReducer | TimeActionTypeReducer | SaveTimeTypeReducer
): TimeState => {
  switch (action.type) {
    case ACTION_TYPES.SAVE_INITIAL_TIME:
      return { ...state, initialTime: action.timeToSave };
    case ACTION_TYPES.SAVE_SCORE_TIME:
      return { ...state, scoreTime: action.timeToSave };
    case ACTION_TYPES.RESET_TIME:
      return { ...state, initialTime: 0, scoreTime: 0 };
    default:
      return state;
  }
};
