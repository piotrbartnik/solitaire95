import React from "react";
import { connect } from "react-redux";
import {
  undoTakeOneFromStock,
  setUndoAction,
  undoRemoveCardFromPile,
  undoMoveFromStockToPiles,
  undoMoveFromStockToFoundation,
  undoMoveFromPileToFoundation,
  undoMoveFromFoundationToPiles,
  undoThreeCardsFromStock,
  countScore,
} from "../../../../../store/actions/";
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
} from "../../../../../store/actions/actionTypes";
import { FoundationState, GameState } from "../../../../../store/reducers";
import { cardConfigType } from "../../../../../configs/cardTypes";
import { ToolButton } from "../../../../ui-components";

type UndoButtonStateTypes = {
  actionToUndo: UndoActionType;
};

type UndoButtonDispatchTypes = {
  substractScorePoints: CountScoreType;
  undoTakeOneFromStock: UndoTakeOneFromStockType;
  undoThreeCardsFromStock: UndoThreeCardsFromStockType;
  setUndoAction: SetUndoActionType;
  undoRemoveCardFromPile: UndoRemoveCardFromPileType;
  undoMoveFromStockToPiles: UndoMoveFromStockToPilesType;
  undoMoveFromStockToFoundation: UndoMoveFromStockToFoundationType;
  undoMoveFromPileToFoundation: UndoMoveFromPileToFoundationType;
  undoMoveFromFoundationToPiles: UndoMoveFromFoundationToPilesType;
};

type UndoButtonPropTypes = {
  setBottomBarText: (text: string) => void;
  setGameVisible: (prevState: boolean) => void;
  gameVisible: boolean;
};

export const UndoButtonInternal: React.FC<
  UndoButtonPropTypes & UndoButtonStateTypes & UndoButtonDispatchTypes
> = ({
  setBottomBarText,
  actionToUndo,
  setGameVisible,
  gameVisible,
  undoTakeOneFromStock,
  setUndoAction,
  undoRemoveCardFromPile,
  undoMoveFromStockToPiles,
  substractScorePoints,
  undoMoveFromStockToFoundation,
  undoMoveFromPileToFoundation,
  undoMoveFromFoundationToPiles,
  undoThreeCardsFromStock,
}) => {
  return (
    <ToolButton
      onMouseOver={() => setBottomBarText("Undo last action")}
      onMouseLeave={() => setBottomBarText("")}
      text="Undo"
      disabled={!actionToUndo?.length}
      onClick={() => {
        setGameVisible(!gameVisible);
        if (actionToUndo.length) {
          if (actionToUndo[0] === "TAKE_ONE_FROM_STOCK") {
            undoTakeOneFromStock(
              actionToUndo[1] as cardConfigType[],
              actionToUndo[2] as cardConfigType[]
            );
          }
          if (actionToUndo[0] === "ADD_CARD_TO_PILE") {
            undoRemoveCardFromPile(
              actionToUndo[1] as {
                [key: string]: cardConfigType[];
              }
            );
          }
          if (actionToUndo[0] === "TAKE_THREE_FROM_STOCK") {
            undoThreeCardsFromStock(
              actionToUndo[1] as cardConfigType[],
              actionToUndo[2] as cardConfigType[],
              actionToUndo[3] as cardConfigType[]
            );
          }
          if (actionToUndo[0] === "REVERSE_STOCK") {
            undoThreeCardsFromStock(
              actionToUndo[1] as cardConfigType[],
              actionToUndo[2] as cardConfigType[],
              actionToUndo[3] as cardConfigType[]
            );
          }
          if (actionToUndo[0] === "FROM_STOCK_TO_PILE") {
            substractScorePoints(-5);
            undoMoveFromStockToPiles(
              actionToUndo[1] as {
                [key: string]: cardConfigType[];
              },
              actionToUndo[2] as cardConfigType[],
              actionToUndo[3] as cardConfigType[]
            );
          }
          if (actionToUndo[0] === "FROM_STOCK_TO_FOUNDATION") {
            substractScorePoints(-10);
            undoMoveFromStockToFoundation(
              actionToUndo[1] as { [key: string]: FoundationState },
              actionToUndo[2] as cardConfigType[],
              actionToUndo[3] as cardConfigType[]
            );
          }
          if (actionToUndo[0] === "FROM_PILE_TO_FOUNDATION") {
            substractScorePoints(-10);
            undoMoveFromPileToFoundation(
              actionToUndo[1] as { [key: string]: FoundationState },
              actionToUndo[2] as { [key: string]: cardConfigType[] }
            );
          }
          if (actionToUndo[0] === "FROM_FOUNDATION_TO_PILES") {
            substractScorePoints(10);
            undoMoveFromFoundationToPiles(
              actionToUndo[1] as { [key: string]: FoundationState },
              actionToUndo[2] as { [key: string]: cardConfigType[] }
            );
          }
          setUndoAction([]);
        }
      }}
    />
  );
};

const mapStateToProps = (state: { gameState: GameState }) => {
  return {
    actionToUndo: state.gameState.actionToUndo,
  };
};

const mapDispatchToProps = {
  undoTakeOneFromStock,
  undoThreeCardsFromStock,
  setUndoAction,
  undoRemoveCardFromPile,
  undoMoveFromStockToPiles,
  substractScorePoints: countScore,
  undoMoveFromStockToFoundation,
  undoMoveFromPileToFoundation,
  undoMoveFromFoundationToPiles,
};

export const UndoButton = connect<
  UndoButtonStateTypes,
  UndoButtonDispatchTypes,
  UndoButtonPropTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(UndoButtonInternal);
