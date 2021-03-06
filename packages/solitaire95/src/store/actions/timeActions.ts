import * as actionTypes from "./actionTypes";

export interface TimeActionTypes {
  type: string;
}

export interface SaveTimeTypes extends TimeActionTypes {
  timeToSave: number;
}

export const saveTime = (timeToSave: number): SaveTimeTypes => {
  return {
    type: actionTypes.SAVE_INITIAL_TIME,
    timeToSave: timeToSave,
  };
};

export const saveScoreTime = (timeToSave: number): SaveTimeTypes => {
  return {
    type: actionTypes.SAVE_SCORE_TIME,
    timeToSave: timeToSave,
  };
};

export const resetTime = (): TimeActionTypes => {
  return {
    type: actionTypes.RESET_TIME,
  };
};
