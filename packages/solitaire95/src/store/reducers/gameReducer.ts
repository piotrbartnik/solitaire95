import { cardConfigType } from "../../configs/cardTypes";

export interface GameState {
  gameStarted: boolean;
  gameFinished: boolean;
  actionToUndo: [string, cardConfigType[], cardConfigType[]] | [];
}

interface GameStateActionTypes {
  type: string;
  gameFinished: boolean;
  actionToUndo: [string, cardConfigType[], cardConfigType[]] | [];
}

const initialState: GameState = {
  gameStarted: false,
  gameFinished: false,
  actionToUndo: [],
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
    default:
      return state;
  }
};
