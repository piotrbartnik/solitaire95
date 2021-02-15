interface points {
  points: number;
}

interface countScoreActionTypes {
  type: string;
  countScore: number;
}

const initialState: points = {
  points: 0,
};

export const countScore = (
  state = initialState,
  action: countScoreActionTypes
): points => {
  switch (action.type) {
    case "COUNT_SCORE":
      return { ...state, points: state.points + action.countScore };
    case "RESET_SCORE":
      return { ...state, points: 0 };
    default:
      return state;
  }
};
