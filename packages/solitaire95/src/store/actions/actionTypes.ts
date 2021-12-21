export enum ACTION_TYPES {
  DEAL_CARDS = "DEAL_CARDS",
  TAKE_ONE_FROM_STOCK = "TAKE_ONE_FROM_STOCK",
  TAKE_THREE_FROM_STOCK = "TAKE_THREE_FROM_STOCK",
  REVERSE_STOCK = "REVERSE_STOCK",
  REMOVE_CARD_FROM_STOCK = "REMOVE_CARD_FROM_STOCK",
  ADD_CARD_TO_PILE = "ADD_CARD_TO_PILE",
  REMOVE_CARD_FROM_PILE = "REMOVE_CARD_FROM_PILE",
  TURN_CARD_ON_PILE = "TURN_CARD_ON_PILE",
  STOCK_TURN_COUNTER = "STOCK_TURN_COUNTER",
  RESET_STOCK_COUNTER = "RESET_STOCK_COUNTER",
  ADD_CARD_TO_FIRST_FOUNDATION = "ADD_CARD_TO_FIRST_FOUNDATION",
  ADD_CARD_TO_SECOND_FOUNDATION = "ADD_CARD_TO_SECOND_FOUNDATION",
  ADD_CARD_TO_THIRD_FOUNDATION = "ADD_CARD_TO_THIRD_FOUNDATION",
  ADD_CARD_TO_FOURTH_FOUNDATION = "ADD_CARD_TO_FOURTH_FOUNDATION",
  REMOVE_CARD_FROM_FOUNDATION = "REMOVE_CARD_FROM_FOUNDATION",
  TOGGLE_WINDOW = "TOGGLE_WINDOW",
  COUNT_SCORE = "COUNT_SCORE",
  RESET_SCORE = "RESET_SCORE",
  START_GAME = "START_GAME",
  STOP_GAME = "STOP_GAME",
  FINISH_GAME = "FINISH_GAME",
  OUTLINE_DRAGGING = "OUTLINE_DRAGGING",
  TOGGLE_BOTTOMBAR = "TOGGLE_BOTTOMBAR",
  TOGGLE_TIMER = "TOGGLE_TIMER",
  TOGGLE_DRAW_TYPE = "TOGGLE_DRAW_TYPE",
  TOGGLE_SCORE_TYPE = "TOGGLE_SCORE_TYPE",
  SET_CARD_DECK = "SET_CARD_DECK",
  SAVE_INITIAL_TIME = "SAVE_INITIAL_TIME",
  RESET_TIME = "RESET_TIME",
  SAVE_SCORE_TIME = "SAVE_SCORE_TIME",
  SET_UNDO_ACTION = "SET_UNDO_ACTION",
  UNDO_TAKE_ONE_FROM_STOCK = "UNDO_TAKE_ONE_FROM_STOCK",
  UNDO_TAKE_THREE_FROM_STOCK = "UNDO_TAKE_THREE_FROM_STOCK",
  UNDO_REMOVE_FROM_PILE = "UNDO_REMOVE_FROM_PILE",
  UNDO_MOVE_FROM_STOCK_TO_PILE = "UNDO_MOVE_FROM_STOCK_TO_PILE",
  UNDO_MOVE_FROM_STOCK_TO_FOUNDATION = "UNDO_MOVE_FROM_STOCK_TO_FOUNDATION",
  UNDO_MOVE_FROM_PILE_TO_FOUNDATION = "UNDO_MOVE_FROM_PILE_TO_FOUNDATION",
  UNDO_MOVE_FROM_FOUNDATION_TO_PILE = "UNDO_MOVE_FROM_FOUNDATION_TO_PILE",
}

export type {
  StartGameType,
  StopGameType,
  FinishGameType,
  SetUndoActionType,
  SetOutlineDraggingType,
  ToggleBottomBarType,
  ToggleTimerType,
  ToggleDrawType,
  SetCardDeckType,
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
  DrawType,
  ToggleScoreType,
  ScoreType,
  ToggleScoreTypeReducer,
} from "./gameActionTypes";

export { UNDO_TYPES } from "./gameActionTypes";

export type {
  ToggleWindowReducerType,
  ToggleWindowType,
  WindowTypes,
} from "./windowActions";

export type {
  SaveTimeTypeReducer,
  SaveTimeType,
  SaveScoreTimeTypeReducer,
  SaveScoreTimeType,
  TimeActionTypeReducer,
} from "./timeActionTypes";

export type {
  CountScoreTypeReducer,
  CountScoreType,
  ResetScoreTypeReducer,
} from "./scoreActions";

export {
  CardDealTypeReducer,
  TakeOneFromStockTypeReducer,
  TakeOneFromStockType,
  TakeThreeFromStockTypeReducer,
  TakeThreeFromStockType,
  ReverseStockTypeReducer,
  ReverseStockType,
  AddCardToFoundationTypeReducer,
  AddCardToFoundationType,
  RemoveCardFromStockTypeReducer,
  RemoveCardFromStockType,
  RemoveCardFromPileTypeReducer,
  RemoveCardFromPileType,
  AddCardToPileTypeReducer,
  AddCardToPileType,
  RemoveCardFromFoundationTypeReducer,
  RemoveCardFromFoundationType,
  TurnCardOnPileTypeReducer,
  TurnCardOnPileType,
  StockTurnCounterType,
  StockTurnCounterTypeReducer,
  ResetStockCounterTypeReducer,
  UndoTakeOneFromStockTypeReducer,
  UndoTakeOneFromStockType,
  UndoThreeCardsFromStockTypeReducer,
  UndoThreeCardsFromStockType,
  UndoRemoveCardFromPileTypeReducer,
  UndoRemoveCardFromPileType,
  UndoMoveFromStockToPilesTypeReducer,
  UndoMoveFromStockToPilesType,
  UndoMoveFromStockToFoundationTypeReducer,
  UndoMoveFromStockToFoundationType,
  UndoMoveFromPileToFoundationTypeReducer,
  UndoMoveFromPileToFoundationType,
  UndoMoveFromFoundationToPilesTypeReducer,
  UndoMoveFromFoundationToPilesType,
} from "./cardActionTypes";
