import { FoundationState } from "../../../../../store/reducers";
import { cardConfigType } from "../../../../../configs/cardTypes";
import {
  CountScoreType,
  UndoTakeOneFromStockType,
  UndoThreeCardsFromStockType,
  SetUndoActionType,
  UndoRemoveCardFromPileType,
  UndoMoveFromStockToPilesType,
  UndoMoveFromStockToFoundationType,
  UndoMoveFromPileToFoundationType,
  UndoMoveFromFoundationToPilesType,
  UndoActionType,
  UNDO_TYPES,
  CountVegasScoreType,
} from "../../../../../store/actions/actionTypes";

export type SetActionToUndoType = (
  actionToUndo: UndoActionType,
  substractScorePoints: CountScoreType,
  undoTakeOneFromStock: UndoTakeOneFromStockType,
  undoThreeCardsFromStock: UndoThreeCardsFromStockType,
  setUndoAction: SetUndoActionType,
  undoRemoveCardFromPile: UndoRemoveCardFromPileType,
  undoMoveFromStockToPiles: UndoMoveFromStockToPilesType,
  undoMoveFromStockToFoundation: UndoMoveFromStockToFoundationType,
  undoMoveFromPileToFoundation: UndoMoveFromPileToFoundationType,
  undoMoveFromFoundationToPiles: UndoMoveFromFoundationToPilesType,
  substractDollars: CountVegasScoreType
) => void;

export const setActionToUndo: SetActionToUndoType = (
  actionToUndo,
  substractScorePoints,
  undoTakeOneFromStock,
  undoThreeCardsFromStock,
  setUndoAction,
  undoRemoveCardFromPile,
  undoMoveFromStockToPiles,
  undoMoveFromStockToFoundation,
  undoMoveFromPileToFoundation,
  undoMoveFromFoundationToPiles,
  substractDollars
) => {
  if (actionToUndo.length) {
    switch (actionToUndo[0]) {
      case UNDO_TYPES.TAKE_ONE_FROM_STOCK:
        undoTakeOneFromStock(
          actionToUndo[1] as cardConfigType[],
          actionToUndo[2] as cardConfigType[]
        );
        setUndoAction([]);
        break;
      case UNDO_TYPES.ADD_CARD_TO_PILE:
        undoRemoveCardFromPile(
          actionToUndo[1] as {
            [key: string]: cardConfigType[];
          }
        );
        setUndoAction([]);
        break;
      case UNDO_TYPES.TAKE_THREE_FROM_STOCK:
        undoThreeCardsFromStock(
          actionToUndo[1] as cardConfigType[],
          actionToUndo[2] as cardConfigType[],
          actionToUndo[3] as cardConfigType[]
        );
        setUndoAction([]);
        break;
      case UNDO_TYPES.REVERSE_STOCK:
        undoThreeCardsFromStock(
          actionToUndo[1] as cardConfigType[],
          actionToUndo[2] as cardConfigType[],
          actionToUndo[3] as cardConfigType[]
        );
        setUndoAction([]);
        break;
      case UNDO_TYPES.FROM_STOCK_TO_PILE:
        substractScorePoints(-5);
        undoMoveFromStockToPiles(
          actionToUndo[1] as {
            [key: string]: cardConfigType[];
          },
          actionToUndo[2] as cardConfigType[],
          actionToUndo[3] as cardConfigType[]
        );
        setUndoAction([]);
        break;
      case UNDO_TYPES.FROM_STOCK_TO_FOUNDATION:
        substractScorePoints(-10);
        substractDollars(-5);
        undoMoveFromStockToFoundation(
          actionToUndo[1] as { [key: string]: FoundationState },
          actionToUndo[2] as cardConfigType[],
          actionToUndo[3] as cardConfigType[]
        );
        setUndoAction([]);
        break;
      case UNDO_TYPES.FROM_PILE_TO_FOUNDATION:
        substractScorePoints(-10);
        substractDollars(-5);
        undoMoveFromPileToFoundation(
          actionToUndo[1] as { [key: string]: FoundationState },
          actionToUndo[2] as { [key: string]: cardConfigType[] }
        );
        setUndoAction([]);
        break;
      case UNDO_TYPES.FROM_FOUNDATION_TO_PILES:
        substractScorePoints(10);
        undoMoveFromFoundationToPiles(
          actionToUndo[1] as { [key: string]: FoundationState },
          actionToUndo[2] as { [key: string]: cardConfigType[] }
        );
        setUndoAction([]);
        break;
      default:
        setUndoAction([]);
    }
  }
};
