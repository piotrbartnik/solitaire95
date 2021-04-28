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

export const finishGame = (
  gameFinished: boolean
): { type: string; gameFinished: boolean } => {
  return {
    type: actionTypes.FINISH_GAME,
    gameFinished,
  };
};

export const setUndoAction = (
  actionToUndo: unknown[]
): { type: string; actionToUndo: unknown[] } => {
  return {
    type: actionTypes.SET_UNDO_ACTION,
    actionToUndo,
  };
};
