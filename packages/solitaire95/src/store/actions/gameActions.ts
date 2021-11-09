import { ACTION_TYPES } from "./actionTypes";
import { cardConfigType } from "../../configs/cardTypes";
import { FoundationState } from "../reducers";

export type StartGameType = () => { type: ACTION_TYPES.START_GAME };
export type StopGameType = () => { type: ACTION_TYPES.STOP_GAME };
export type FinishGameType = (gameFinished: boolean) => {
  type: ACTION_TYPES.FINISH_GAME;
  gameFinished: boolean;
};
export type UndoActionType =
  | [
      string,
      (
        | cardConfigType[]
        | { [key: string]: FoundationState }
        | { [key: string]: cardConfigType[] }
      ),
      cardConfigType[] | { [key: string]: cardConfigType[] },
      cardConfigType[]?
    ]
  | [];
export type SetUndoActionType = (actionToUndo: UndoActionType) => {
  type: ACTION_TYPES.SET_UNDO_ACTION;
  actionToUndo: UndoActionType;
};
export type SetOutlineDraggingType = (outlineDragging: boolean) => {
  type: ACTION_TYPES.OUTLINE_DRAGGING;
  outlineDragging: boolean;
};
export type ToggleBottomBarType = (bottomBarVisible: boolean) => {
  type: ACTION_TYPES.TOGGLE_BOTTOMBAR;
  bottomBarVisible: boolean;
};
export type ToggleTimerType = (timerVisible: boolean) => {
  type: ACTION_TYPES.TOGGLE_TIMER;
  timerVisible: boolean;
};
export type ToggleDrawTypeType = (drawType: string) => {
  type: ACTION_TYPES.TOGGLE_DRAW_TYPE;
  drawType: string;
};
export type SetCardDeckType = (cardDeck: string) => {
  type: ACTION_TYPES.SET_CARD_DECK;
  cardDeck: string;
};

export const startGame: StartGameType = () => {
  return {
    type: ACTION_TYPES.START_GAME,
  };
};

export const stopGame: StopGameType = () => {
  return {
    type: ACTION_TYPES.STOP_GAME,
  };
};

export const finishGame: FinishGameType = (gameFinished) => {
  return {
    type: ACTION_TYPES.FINISH_GAME,
    gameFinished,
  };
};

export const setUndoAction: SetUndoActionType = (actionToUndo) => {
  return {
    type: ACTION_TYPES.SET_UNDO_ACTION,
    actionToUndo,
  };
};

export const setOutlineDragging: SetOutlineDraggingType = (outlineDragging) => {
  return {
    type: ACTION_TYPES.OUTLINE_DRAGGING,
    outlineDragging,
  };
};

export const toggleBottomBar: ToggleBottomBarType = (bottomBarVisible) => {
  return {
    type: ACTION_TYPES.TOGGLE_BOTTOMBAR,
    bottomBarVisible,
  };
};

export const toggleTimer: ToggleTimerType = (timerVisible) => {
  return {
    type: ACTION_TYPES.TOGGLE_TIMER,
    timerVisible,
  };
};

export const toggledrawType: ToggleDrawTypeType = (drawType) => {
  return {
    type: ACTION_TYPES.TOGGLE_DRAW_TYPE,
    drawType,
  };
};

export const setCardDeck: SetCardDeckType = (cardDeck) => {
  return {
    type: ACTION_TYPES.SET_CARD_DECK,
    cardDeck,
  };
};
