import * as actionTypes from "./actionTypes";

export const countScore = (points: number) => {
  return {
    type: actionTypes.COUNT_SCORE,
    countScore: points,
  };
};

export const resetScore = () => {
  return {
    type: actionTypes.RESET_SCORE,
  };
};
