import * as actionTypes from "./actionTypes";

export const changeBoolean = (payload: boolean) => {
  return {
    type: actionTypes.CHANGE_BOOLEAN,
    testBoolean: payload,
  };
};

export const boolToString = (payload: string) => {
  return {
    type: actionTypes.CHANGE_BOOLEAN_TO_STRING,
    testBoolean: payload,
  };
};
