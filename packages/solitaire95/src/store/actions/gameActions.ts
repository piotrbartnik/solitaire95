import * as actionTypes from "./actionTypes";

export const startGame = () => {
  return {
    type: actionTypes.START_GAME,
  };
};

export const stopGame = () => {
  return {
    type: actionTypes.STOP_GAME,
  };
};
