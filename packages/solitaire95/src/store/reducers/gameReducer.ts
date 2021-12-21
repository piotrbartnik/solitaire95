import {
  StartGameTypeReducer,
  StopGameTypeReducer,
  FinishGameTypeReducer,
  SetUndoActionTypeReducer,
  SetOutlineDraggingTypeReducer,
  ToggleBottomBarTypeReducer,
  ToggleTimerTypeReducer,
  ToggleDrawTypeReducer,
  SetCardDeckTypeReducer,
  UndoActionType,
  ACTION_TYPES,
  ScoreType,
  DrawType,
  ToggleScoreTypeReducer,
} from "../actions/actionTypes";

export interface GameState {
  gameStarted: boolean;
  gameFinished: boolean;
  actionToUndo: UndoActionType;
  outlineDragging: boolean;
  bottomBarVisible: boolean;
  timerVisible: boolean;
  drawType: DrawType;
  scoreType: ScoreType;
  cardDeck: string;
}

type GameStateActionTypes =
  | StartGameTypeReducer
  | StopGameTypeReducer
  | FinishGameTypeReducer
  | SetUndoActionTypeReducer
  | SetOutlineDraggingTypeReducer
  | ToggleBottomBarTypeReducer
  | ToggleTimerTypeReducer
  | ToggleDrawTypeReducer
  | SetCardDeckTypeReducer
  | ToggleScoreTypeReducer;

const initialState: GameState = {
  gameStarted: false,
  gameFinished: false,
  actionToUndo: [],
  outlineDragging: false,
  bottomBarVisible: true,
  timerVisible: true,
  drawType: "drawOne",
  scoreType: "standard",
  cardDeck: "acorns",
};

export const gameState = (
  state = initialState,
  action: GameStateActionTypes
): GameState => {
  switch (action.type) {
    case ACTION_TYPES.START_GAME:
      return { ...state, gameStarted: true };
    case ACTION_TYPES.STOP_GAME:
      return { ...state, gameStarted: false };
    case ACTION_TYPES.FINISH_GAME:
      return { ...state, gameFinished: action.gameFinished };
    case ACTION_TYPES.SET_UNDO_ACTION:
      return { ...state, actionToUndo: action.actionToUndo };
    case ACTION_TYPES.OUTLINE_DRAGGING:
      return { ...state, outlineDragging: action.outlineDragging };
    case ACTION_TYPES.TOGGLE_BOTTOMBAR:
      return { ...state, bottomBarVisible: action.bottomBarVisible };
    case ACTION_TYPES.TOGGLE_TIMER:
      return { ...state, timerVisible: action.timerVisible };
    case ACTION_TYPES.TOGGLE_DRAW_TYPE:
      return { ...state, drawType: action.drawType };
    case ACTION_TYPES.TOGGLE_SCORE_TYPE:
      return { ...state, scoreType: action.scoreType };
    case ACTION_TYPES.SET_CARD_DECK:
      return { ...state, cardDeck: action.cardDeck };
    default:
      return state;
  }
};
