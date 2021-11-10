import {
  ACTION_TYPES,
  SaveTimeType,
  SaveScoreTimeType,
  TimeActionTypeReducer,
} from "./actionTypes";

export const saveTime: SaveTimeType = (timeToSave) => {
  return {
    type: ACTION_TYPES.SAVE_INITIAL_TIME,
    timeToSave: timeToSave,
  };
};

export const saveScoreTime: SaveScoreTimeType = (timeToSave) => {
  return {
    type: ACTION_TYPES.SAVE_SCORE_TIME,
    timeToSave: timeToSave,
  };
};

export const resetTime = (): TimeActionTypeReducer => {
  return {
    type: ACTION_TYPES.RESET_TIME,
  };
};
