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

export enum UNDO_TYPES {
  REVERSE_STOCK = "REVERSE_STOCK",
  TAKE_ONE_FROM_STOCK = "TAKE_ONE_FROM_STOCK",
  TAKE_THREE_FROM_STOCK = "TAKE_THREE_FROM_STOCK",
  REMOVE_CARD_FROM_FOUNDATION = "REMOVE_CARD_FROM_FOUNDATION",
  FROM_FOUNDATION_TO_PILES = "FROM_FOUNDATION_TO_PILES",
  FROM_STOCK_TO_FOUNDATION = "FROM_STOCK_TO_FOUNDATION",
  FROM_STOCK_TO_PILE = "FROM_STOCK_TO_PILE",
  FROM_PILE_TO_FOUNDATION = "FROM_PILE_TO_FOUNDATION",
  ADD_CARD_TO_PILE = "ADD_CARD_TO_PILE",
  ADD_CARD_TO_FOUNDATION = "ADD_CARD_TO_FOUNDATION",
}

export type UndoActionType =
  | [
      UNDO_TYPES,
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

export type DrawType = "drawOne" | "drawThree";
export type ToggleDrawTypeReducer = {
  type: ACTION_TYPES.TOGGLE_DRAW_TYPE;
  drawType: DrawType;
};
export type ToggleDrawType = (drawType: DrawType) => ToggleDrawTypeReducer;

export type ScoreType = "standard" | "vegas" | "none";
export type ToggleScoreTypeReducer = {
  type: ACTION_TYPES.TOGGLE_SCORE_TYPE;
  scoreType: ScoreType;
};
export type ToggleScoreType = (scoreType: ScoreType) => ToggleScoreTypeReducer;

export type SetCardDeckTypeReducer = {
  type: ACTION_TYPES.SET_CARD_DECK;
  cardDeck: string;
};
export type SetCardDeckType = (cardDeck: string) => SetCardDeckTypeReducer;

export type KeepVegasScoreTypeReducer = {
  type: ACTION_TYPES.KEEP_VEGAS_SCORE;
  keepVegasScore: boolean;
};

export type KeepVegasScoreType = (
  keepVegasScore: boolean
) => KeepVegasScoreTypeReducer;
