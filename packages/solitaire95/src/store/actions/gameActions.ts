import * as actionTypes from "./actionTypes";
import { cardConfigType } from "../../configs/cardTypes";

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
  actionToUndo: [string, cardConfigType[], cardConfigType[]] | []
): {
  type: string;
  actionToUndo: [string, cardConfigType[], cardConfigType[]] | [];
} => {
  return {
    type: actionTypes.SET_UNDO_ACTION,
    actionToUndo,
  };
};
