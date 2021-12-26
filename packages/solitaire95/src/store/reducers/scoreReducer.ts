import {
  ACTION_TYPES,
  CountScoreTypeReducer,
  ResetScoreTypeReducer,
  CountVegasScoreTypeReducer,
} from "../actions/actionTypes";

export interface Points {
  points: number;
  dollars: number;
}

const initialState: Points = {
  points: 0,
  dollars: -52,
};

export const countScore = (
  state = initialState,
  action:
    | CountScoreTypeReducer
    | ResetScoreTypeReducer
    | CountVegasScoreTypeReducer
): Points => {
  switch (action.type) {
    case ACTION_TYPES.COUNT_SCORE: {
      const pointsCounted = state.points + action.countScore;
      return { ...state, points: pointsCounted < 0 ? 0 : pointsCounted };
    }
    case ACTION_TYPES.COUNT_VEGAS_SCORE: {
      const dollarsCounted = state.dollars + action.dollars;
      return { ...state, dollars: dollarsCounted };
    }
    case ACTION_TYPES.RESET_SCORE:
      return { ...state, points: 0 };
    default:
      return state;
  }
};
