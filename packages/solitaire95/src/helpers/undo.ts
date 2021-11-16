import { Middleware } from "redux";
import { UndoActionType } from "../store/actions/actionTypes";
import { setUndoAction } from "../store/actions";
import { UNDO_TYPES, ACTION_TYPES } from "../store/actions/actionTypes";

export const undoActions: Middleware = (store) => (next) => (action) => {
  const previousState = store.getState();

  let actionToUndo: UndoActionType = [];
  const undoState = store.getState().gameState.actionToUndo;

  switch (action.type) {
    case ACTION_TYPES.REVERSE_STOCK:
      if (previousState.gameState.drawType === "drawOne") {
        actionToUndo = [
          action.type,
          previousState.cardDistribution.cardsOnStock,
          previousState.cardDistribution.threeCardsOnTable,
          previousState.cardDistribution.cardsFromStock.reverse(),
        ];
      }
      if (previousState.gameState.drawType === "drawThree") {
        actionToUndo = [
          action.type,
          previousState.cardDistribution.cardsOnStock,
          previousState.cardDistribution.threeCardsOnTable,
          previousState.cardDistribution.cardsFromStock,
        ];
      }
      store.dispatch(setUndoAction(actionToUndo));
      break;
    case ACTION_TYPES.TAKE_ONE_FROM_STOCK:
      actionToUndo = [
        action.type,
        previousState.cardDistribution.cardsOnStock,
        previousState.cardDistribution.cardsFromStock,
      ];
      store.dispatch(setUndoAction(actionToUndo));
      break;
    case ACTION_TYPES.TAKE_THREE_FROM_STOCK:
      actionToUndo = [
        action.type,
        previousState.cardDistribution.cardsOnStock,
        previousState.cardDistribution.threeCardsOnTable,
        previousState.cardDistribution.cardsFromStock,
      ];
      store.dispatch(setUndoAction(actionToUndo));
      break;
    case ACTION_TYPES.REMOVE_CARD_FROM_FOUNDATION:
      actionToUndo = [action.type, previousState.cardsOnFoundation, []];
      store.dispatch(setUndoAction(actionToUndo));
      break;
    case ACTION_TYPES.ADD_CARD_TO_PILE:
      if (undoState[0] === UNDO_TYPES.REMOVE_CARD_FROM_FOUNDATION) {
        undoState[0] = UNDO_TYPES.FROM_FOUNDATION_TO_PILES;
        undoState[2] = previousState.cardDistribution.cardsOnPiles;
        store.dispatch(setUndoAction(undoState));
      } else if (undoState[0] === UNDO_TYPES.ADD_CARD_TO_PILE) {
        break;
      } else {
        actionToUndo = [
          action.type,
          previousState.cardDistribution.cardsOnPiles,
          [],
        ];
        store.dispatch(setUndoAction(actionToUndo));
      }
      break;
    case ACTION_TYPES.REMOVE_CARD_FROM_STOCK:
      if (undoState[0] === UNDO_TYPES.ADD_CARD_TO_FOUNDATION) {
        undoState[0] = UNDO_TYPES.FROM_STOCK_TO_FOUNDATION;
      }
      if (undoState[0] === UNDO_TYPES.ADD_CARD_TO_PILE) {
        undoState[0] = UNDO_TYPES.FROM_STOCK_TO_PILE;
      }
      if (previousState.gameState.drawType === "drawOne") {
        undoState[2] = previousState.cardDistribution.cardsFromStock;
      } else {
        undoState[2] = previousState.cardDistribution.cardsFromStock;
        undoState[3] = previousState.cardDistribution.threeCardsOnTable;
      }
      store.dispatch(setUndoAction(undoState));
      break;
    case ACTION_TYPES.REMOVE_CARD_FROM_PILE:
      if (undoState[0] === UNDO_TYPES.ADD_CARD_TO_FOUNDATION) {
        undoState[0] = UNDO_TYPES.FROM_PILE_TO_FOUNDATION;
      }
      undoState[2] = previousState.cardDistribution.cardsOnPiles;
      store.dispatch(setUndoAction(undoState));
      break;
  }
  if (action.type.match(/ADD_CARD_TO_[A-Z]+_FOUNDATION/)) {
    actionToUndo = [
      UNDO_TYPES.ADD_CARD_TO_FOUNDATION,
      previousState.cardsOnFoundation,
      [],
    ];
    store.dispatch(setUndoAction(actionToUndo));
  }

  return next(action);
};
