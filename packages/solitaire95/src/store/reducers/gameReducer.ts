import { cardConfigType } from "../../configs/cardTypes";

export interface GameState {
  gameStarted: boolean;
  gameFinished: boolean;
  actionToUndo: [string, cardConfigType[], cardConfigType[]] | [];
  outlineDragging: boolean;
  bottomBarVisible: boolean;
  timerVisible: boolean;
  drawType: string;
}

interface GameStateActionTypes {
  type: string;
  gameFinished: boolean;
  actionToUndo: [string, cardConfigType[], cardConfigType[]] | [];
  outlineDragging: boolean;
  bottomBarVisible: boolean;
  timerVisible: boolean;
  drawType: string;
}

const initialState: GameState = {
  gameStarted: false,
  gameFinished: false,
  actionToUndo: [],
  outlineDragging: false,
  bottomBarVisible: true,
  timerVisible: true,
  drawType: "oneCard",
};

export const gameState = (
  state = initialState,
  action: GameStateActionTypes
): GameState => {
  switch (action.type) {
    case "START_GAME":
      return { ...state, gameStarted: true };
    case "STOP_GAME":
      return { ...state, gameStarted: false };
    case "FINISH_GAME":
      return { ...state, gameFinished: action.gameFinished };
    case "SET_UNDO_ACTION":
      return { ...state, actionToUndo: action.actionToUndo };
    case "OUTLINE_DRAGGING":
      return { ...state, outlineDragging: action.outlineDragging };
    case "TOGGLE_BOTTOMBAR":
      return { ...state, bottomBarVisible: action.bottomBarVisible };
    case "TOGGLE_TIMER":
      return { ...state, timerVisible: action.timerVisible };
    case "TOGGLE_DRAW_TYPE":
      return { ...state, drawType: action.drawType };
    default:
      return state;
  }
};
