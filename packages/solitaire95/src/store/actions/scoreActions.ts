import { ACTION_TYPES } from "./actionTypes";

export type CountScoreTypeReducer = {
  type: ACTION_TYPES.COUNT_SCORE;
  countScore: number;
};
export type CountScoreType = (points: number) => CountScoreTypeReducer;

export const countScore: CountScoreType = (points) => {
  return {
    type: ACTION_TYPES.COUNT_SCORE,
    countScore: points,
  };
};

export type ResetScoreTypeReducer = { type: ACTION_TYPES.RESET_SCORE };

export const resetScore = (): ResetScoreTypeReducer => {
  return {
    type: ACTION_TYPES.RESET_SCORE,
  };
};
