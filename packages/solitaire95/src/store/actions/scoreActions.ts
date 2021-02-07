import * as actionTypes from "./actionTypes";

export const countScore = (
  points: number
): { type: string; countScore: number } => {
  return {
    type: actionTypes.COUNT_SCORE,
    countScore: points,
  };
};

export const resetScore = (): { type: string } => {
  return {
    type: actionTypes.RESET_SCORE,
  };
};
