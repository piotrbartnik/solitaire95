import * as actionTypes from "./actionTypes";

export interface resetScoreTypes {
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

export const resetScore = (): resetScoreTypes => {
  return {
    type: actionTypes.RESET_SCORE,
  };
};
