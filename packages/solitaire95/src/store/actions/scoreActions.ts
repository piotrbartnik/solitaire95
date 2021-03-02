import * as actionTypes from "./actionTypes";

export interface ResetScoreTypes {
  type: string;
}

export const countScore = (
  points: number
): { type: string; countScore: number } => {
  return {
    type: actionTypes.COUNT_SCORE,
    countScore: points,
  };
};

export const resetScore = (): ResetScoreTypes => {
  return {
    type: actionTypes.RESET_SCORE,
  };
};
