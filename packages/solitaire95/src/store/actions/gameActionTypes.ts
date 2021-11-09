import { ACTION_TYPES } from "./actionTypes";
import { cardConfigType } from "../../configs/cardTypes";
import { FoundationState } from "../reducers";

export type StartGameTypeReducer = { type: ACTION_TYPES.START_GAME };
export type StartGameType = () => StartGameTypeReducer;

export type StopGameTypeReducer = { type: ACTION_TYPES.STOP_GAME };
export type StopGameType = () => StopGameTypeReducer;

export type FinishGameTypeReducer = {
  type: ACTION_TYPES.FINISH_GAME;
  gameFinished: boolean;
};
export type FinishGameType = (gameFinished: boolean) => FinishGameTypeReducer;

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

export type SetUndoActionTypeReducer = {
  type: ACTION_TYPES.SET_UNDO_ACTION;
  actionToUndo: UndoActionType;
};
export type SetUndoActionType = (
  actionToUndo: UndoActionType
) => SetUndoActionTypeReducer;

export type SetOutlineDraggingTypeReducer = {
  type: ACTION_TYPES.OUTLINE_DRAGGING;
  outlineDragging: boolean;
};
export type SetOutlineDraggingType = (
  outlineDragging: boolean
) => SetOutlineDraggingTypeReducer;

export type ToggleBottomBarTypeReducer = {
  type: ACTION_TYPES.TOGGLE_BOTTOMBAR;
  bottomBarVisible: boolean;
};
export type ToggleBottomBarType = (
  bottomBarVisible: boolean
) => ToggleBottomBarTypeReducer;

export type ToggleTimerTypeReducer = {
  type: ACTION_TYPES.TOGGLE_TIMER;
  timerVisible: boolean;
};
export type ToggleTimerType = (timerVisible: boolean) => ToggleTimerTypeReducer;

export type ToggleDrawTypeReducer = {
  type: ACTION_TYPES.TOGGLE_DRAW_TYPE;
  drawType: "drawOne" | "drawThree";
};
export type ToggleDrawType = (
  drawType: "drawOne" | "drawThree"
) => ToggleDrawTypeReducer;

export type SetCardDeckTypeReducer = {
  type: ACTION_TYPES.SET_CARD_DECK;
  cardDeck: string;
};
export type SetCardDeckType = (cardDeck: string) => SetCardDeckTypeReducer;
