import { ACTION_TYPES } from "./actionTypes";

export type CountScoreTypeReducer = {
  type: ACTION_TYPES.COUNT_SCORE;
  countScore: number;
};
export type CountScoreType = (points: number) => CountScoreTypeReducer;

export type CountVegasScoreTypeReducer = {
  type: ACTION_TYPES.COUNT_VEGAS_SCORE;
  dollars: number;
};

export type CountVegasScoreType = (
  dollars: number
) => CountVegasScoreTypeReducer;

export const countScore: CountScoreType = (points) => {
  return {
    type: ACTION_TYPES.COUNT_SCORE,
    countScore: points,
  };
};

export const countVegasScore: CountVegasScoreType = (dollars) => ({
  type: ACTION_TYPES.COUNT_VEGAS_SCORE,
  dollars,
});

export type ResetScoreTypeReducer = { type: ACTION_TYPES.RESET_SCORE };

export const resetScore = (): ResetScoreTypeReducer => {
  return {
    type: ACTION_TYPES.RESET_SCORE,
  };
};

export type ResetVegasScoreTypeReducer = {
  type: ACTION_TYPES.RESET_VEGAS_SCORE;
};

export const resetVegasScore = (): ResetVegasScoreTypeReducer => {
  return {
    type: ACTION_TYPES.RESET_VEGAS_SCORE,
  };
};
