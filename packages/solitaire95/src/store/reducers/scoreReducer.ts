export interface Points {
  points: number;
}

export interface CountScoreActionTypes {
  type: string;
  countScore: number;
}

const initialState: Points = {
  points: 0,
};

export const countScore = (
  state = initialState,
  action: CountScoreActionTypes
): Points => {
  switch (action.type) {
    case "COUNT_SCORE": {
      const pointsCounted = state.points + action.countScore;
      return { ...state, points: pointsCounted < 0 ? 0 : pointsCounted };
    }
    case "RESET_SCORE":
      return { ...state, points: 0 };
    default:
      return state;
  }
};
