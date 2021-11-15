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
import { GameState } from "../../../../../store/reducers";
import { ToolButton } from "../../../../ui-components";
import { setActionToUndo } from "./UndoButtonHelpers";

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
        setActionToUndo(
          actionToUndo,
          substractScorePoints,
          undoTakeOneFromStock,
          undoThreeCardsFromStock,
          setUndoAction,
          undoRemoveCardFromPile,
          undoMoveFromStockToPiles,
          undoMoveFromStockToFoundation,
          undoMoveFromPileToFoundation,
          undoMoveFromFoundationToPiles
        );
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
