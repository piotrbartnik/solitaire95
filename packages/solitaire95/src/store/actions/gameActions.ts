import * as actionTypes from "./actionTypes";
import { cardConfigType } from "../../configs/cardTypes";
import { FoundationState } from "../reducers";

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

export type UndoActionType =
  | [
      string,
      (
        | cardConfigType[]
        | { [key: string]: FoundationState }
        | { [key: string]: cardConfigType[] }
      ),
      cardConfigType[] | { [key: string]: cardConfigType[] }
    ]
  | [];

export const setUndoAction = (
  actionToUndo: UndoActionType
): {
  type: string;
  actionToUndo: UndoActionType;
} => {
  return {
    type: actionTypes.SET_UNDO_ACTION,
    actionToUndo,
  };
};

export const setOutlineDragging = (
  outlineDragging: boolean
): {
  type: string;
  outlineDragging: boolean;
} => {
  return {
    type: actionTypes.OUTLINE_DRAGGING,
    outlineDragging,
  };
};

export const toggleBottomBar = (
  bottomBarVisible: boolean
): {
  type: string;
  bottomBarVisible: boolean;
} => {
  return {
    type: actionTypes.TOGGLE_BOTTOMBAR,
    bottomBarVisible,
  };
};
