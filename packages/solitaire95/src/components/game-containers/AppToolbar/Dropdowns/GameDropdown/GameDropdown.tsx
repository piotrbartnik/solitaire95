import React from "react";
import { connect } from "react-redux";
import {
  toggleWindow,
  finishGame,
  undoTakeOneFromStock,
  setUndoAction,
  undoRemoveCardFromPile,
  undoMoveFromStockToPiles,
  countScore,
  undoMoveFromStockToFoundation,
  undoMoveFromPileToFoundation,
  undoMoveFromFoundationToPiles,
  UndoActionType,
  undoThreeCardsFromStock,
} from "../../../../../store/actions/";
import { GameState, FoundationState } from "../../../../../store/reducers";
import { cardConfigType } from "../../../../../configs/cardTypes";
import { ToolButton, Separator } from "../../../../ui-components";
import { dealCardsAllSteps } from "../../../../../helpers/dealCardsAllSteps";

type GameDropdownStateTypes = {
  actionToUndo: UndoActionType;
};

type GameDropdownDispatchTypes = {
  toggleCardBackWindow: (windowState: boolean, windowToToggle: string) => void;
  substractScorePoints: (pointsToSubstract: number) => void;
  setGameFinished: (gameState: boolean) => void;
  dealCardsAllSteps: () => void;
};

type GameDropdownPropTypes = {
  gameVisible: boolean;
  setBottomBarText: (text: string) => void;
  setGameVisible: (prevState: boolean) => void;
  setHelpVisible: (prevState: boolean) => void;
};

export const GameDropdownInternal: React.FC<
  GameDropdownPropTypes & GameDropdownStateTypes & GameDropdownDispatchTypes
> = ({
  actionToUndo,
  gameVisible,
  toggleCardBackWindow,
  substractScorePoints,
  dealCardsAllSteps,
  setGameFinished,
  setBottomBarText,
  setGameVisible,
  setHelpVisible,
}) => {
  return (
    <>
      <ToolButton
        onClick={() => {
          setGameVisible(!gameVisible);
          setHelpVisible(false);
          setGameFinished(false);
          dealCardsAllSteps();
        }}
        onMouseOver={() => setBottomBarText("Deal a new game")}
        onMouseLeave={() => setBottomBarText("")}
        text="Deal"
      />
      <Separator />
      <ToolButton
        onMouseOver={() => setBottomBarText("Undo last action")}
        onMouseLeave={() => setBottomBarText("")}
        text="Undo"
        disabled={!actionToUndo?.length}
        onClick={() => {
          setGameVisible(!gameVisible);
          console.log(actionToUndo);
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
      <ToolButton
        onClick={() => {
          toggleCardBackWindow(true, "cardBackWindow");
          setGameVisible(false);
        }}
        onMouseOver={() => setBottomBarText("Choose new deck back")}
        onMouseLeave={() => setBottomBarText("")}
        text="Deck"
      />
      <ToolButton
        onClick={() => {
          toggleCardBackWindow(true, "optionsWindow");
          setGameVisible(false);
        }}
        onMouseOver={() => setBottomBarText("Change Solitaire options")}
        onMouseLeave={() => setBottomBarText("")}
        text="Options"
      />
      <Separator />
      <ToolButton
        onMouseOver={() => setBottomBarText("Exit Solitaire")}
        onMouseLeave={() => setBottomBarText("")}
        text="Exit"
        disabled
      />
    </>
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
    toggleCardBackWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
    substractScorePoints: (pointsToSubstract: number) =>
      dispatch(countScore(pointsToSubstract)),
    setGameFinished: (gameState: boolean) => dispatch(finishGame(gameState)),
    dealCardsAllSteps: () => dealCardsAllSteps(dispatch),
  };
};

export const GameDropdown = connect<
  GameDropdownStateTypes,
  GameDropdownDispatchTypes,
  GameDropdownPropTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(GameDropdownInternal);
