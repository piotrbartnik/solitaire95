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
  UndoActionType,
  undoThreeCardsFromStock,
  countScore,
} from "../../../../../store/actions/";
import { FoundationState, GameState } from "../../../../../store/reducers";
import { cardConfigType } from "../../../../../configs/cardTypes";
import { ToolButton } from "../../../../ui-components";

type UndoButtonStateTypes = {
  actionToUndo: UndoActionType;
};

type UndoButtonDispatchTypes = {
  substractScorePoints: (pointsToSubstract: number) => void;
  undoTakeOneFromStock: (
    cardsOnStockUndo: cardConfigType[],
    cardsFromStockUndo: cardConfigType[]
  ) => void;
  undoThreeCardsFromStock: (
    cardsOnStockUndo: cardConfigType[],
    threeCardsFromStockUndo: cardConfigType[],
    cardsFromStockUndo: cardConfigType[]
  ) => void;
  setUndoAction: (clearUndoActions: []) => void;
  undoRemoveCardFromPile: (pilesState: {
    [key: string]: cardConfigType[];
  }) => void;
  undoMoveFromStockToPiles: (
    pilesState: { [key: string]: cardConfigType[] },
    cardsFromStockState: cardConfigType[],
    threeCardsFromStock?: cardConfigType[]
  ) => void;
  undoMoveFromStockToFoundation: (
    foundationState: { [key: string]: FoundationState },
    cardsFromStockState: {
      [key: string]: cardConfigType[];
    },
    threeCardsFromStock?: cardConfigType[]
  ) => void;
  undoMoveFromPileToFoundation: (
    foundationState: { [key: string]: FoundationState },
    pilesState: { [key: string]: cardConfigType[] }
  ) => void;
  undoMoveFromFoundationToPiles: (
    foundationState: { [key: string]: FoundationState },
    pilesState: { [key: string]: cardConfigType[] }
  ) => void;
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
              actionToUndo[2] as { [key: string]: cardConfigType[] },
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    undoTakeOneFromStock: (
      cardsOnStockUndo: cardConfigType[],
      cardsFromStockUndo: cardConfigType[]
    ) => dispatch(undoTakeOneFromStock(cardsOnStockUndo, cardsFromStockUndo)),
    undoThreeCardsFromStock: (
      cardsOnStockUndo: cardConfigType[],
      threeCardsFromStockUndo: cardConfigType[],
      cardsFromStockUndo: cardConfigType[]
    ) =>
      dispatch(
        undoThreeCardsFromStock(
          cardsOnStockUndo,
          threeCardsFromStockUndo,
          cardsFromStockUndo
        )
      ),
    setUndoAction: (clearUndoActions: []) =>
      dispatch(setUndoAction(clearUndoActions)),
    undoRemoveCardFromPile: (pilesState: { [key: string]: cardConfigType[] }) =>
      dispatch(undoRemoveCardFromPile(pilesState)),
    undoMoveFromStockToPiles: (
      pilesState: { [key: string]: cardConfigType[] },
      cardsFromStockState: cardConfigType[],
      threeCardsFromStock?: cardConfigType[]
    ) =>
      dispatch(
        undoMoveFromStockToPiles(
          pilesState,
          cardsFromStockState,
          threeCardsFromStock
        )
      ),
    substractScorePoints: (pointsToSubstract: number) =>
      dispatch(countScore(pointsToSubstract)),
    undoMoveFromStockToFoundation: (
      foundationState: { [key: string]: FoundationState },
      cardsFromStockState: {
        [key: string]: cardConfigType[];
      },
      threeCardsFromStock?: cardConfigType[]
    ) =>
      dispatch(
        undoMoveFromStockToFoundation(
          foundationState,
          cardsFromStockState,
          threeCardsFromStock
        )
      ),
    undoMoveFromPileToFoundation: (
      foundationState: { [key: string]: FoundationState },
      pilesState: { [key: string]: cardConfigType[] }
    ) => dispatch(undoMoveFromPileToFoundation(foundationState, pilesState)),
    undoMoveFromFoundationToPiles: (
      foundationState: { [key: string]: FoundationState },
      pilesState: { [key: string]: cardConfigType[] }
    ) => dispatch(undoMoveFromFoundationToPiles(foundationState, pilesState)),
  };
};

export const UndoButton = connect<
  UndoButtonStateTypes,
  UndoButtonDispatchTypes,
  UndoButtonPropTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(UndoButtonInternal);
