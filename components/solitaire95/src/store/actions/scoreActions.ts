import * as actionTypes from "./actionTypes";

export const countPoints = (points: number) => {
  return {
    type: actionTypes.COUNT_POINTS,
    countPoints: points,
  };
};

export const resetPoints = () => {
  return {
    type: actionTypes.RESET_POINTS,
  };
};
