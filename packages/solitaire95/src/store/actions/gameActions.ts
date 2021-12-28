import {
  ACTION_TYPES,
  StartGameType,
  StopGameType,
  FinishGameType,
  SetUndoActionType,
  SetOutlineDraggingType,
  ToggleBottomBarType,
  ToggleTimerType,
  ToggleDrawType,
  SetCardDeckType,
  ToggleScoreType,
  KeepVegasScoreType,
} from "./actionTypes";

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

export const toggledrawType: ToggleDrawType = (drawType) => {
  return {
    type: ACTION_TYPES.TOGGLE_DRAW_TYPE,
    drawType,
  };
};

export const toggleScoreType: ToggleScoreType = (scoreType) => {
  return {
    type: ACTION_TYPES.TOGGLE_SCORE_TYPE,
    scoreType,
  };
};

export const setCardDeck: SetCardDeckType = (cardDeck) => {
  return {
    type: ACTION_TYPES.SET_CARD_DECK,
    cardDeck,
  };
};

export const keepVegasScore: KeepVegasScoreType = (keepVegasScore) => ({
  type: ACTION_TYPES.KEEP_VEGAS_SCORE,
  keepVegasScore,
});
