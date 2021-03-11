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
    case "COUNT_SCORE":
      return { ...state, points: state.points + action.countScore };
    case "RESET_SCORE":
      return { ...state, points: 0 };
    default:
      return state;
  }
};
