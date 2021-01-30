import * as actionTypes from "./actionTypes";

export const countPoints = (points: number) => {
  return {
    type: actionTypes.COUNT_POINTS,
    countPoints: points,
  };
};
