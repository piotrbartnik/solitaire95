interface points {
  points: number;
}

const initialState: points = {
  points: 0,
};

export const countPoints = (state = initialState, action: any) => {
  switch (action.type) {
    case "COUNT_POINTS":
      return { ...state, points: state.points + action.countPoints };
    default:
      return state;
  }
};
