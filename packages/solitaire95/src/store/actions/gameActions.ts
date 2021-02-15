import * as actionTypes from "./actionTypes";

export const startGame = (): { type: string } => {
  return {
    type: actionTypes.START_GAME,
  };
};

export const stopGame = (): { type: string } => {
  return {
    type: actionTypes.STOP_GAME,
  };
};
