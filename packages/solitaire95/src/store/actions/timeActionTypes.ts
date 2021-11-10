import { ACTION_TYPES } from "./actionTypes";

export type SaveTimeTypeReducer = {
  type: ACTION_TYPES.SAVE_INITIAL_TIME;
  timeToSave: number;
};
export type SaveTimeType = (timeToSave: number) => SaveTimeTypeReducer;

export type SaveScoreTimeTypeReducer = {
  type: ACTION_TYPES.SAVE_SCORE_TIME;
  timeToSave: number;
};
export type SaveScoreTimeType = (
  timeToSave: number
) => SaveScoreTimeTypeReducer;

export type TimeActionTypeReducer = {
  type: ACTION_TYPES.RESET_TIME;
};
