import React from "react";
import { connect } from "react-redux";
import {
  dealCards,
  resetScore,
  stopGame,
  toggleWindow,
  resetStockCounter,
  finishGame,
  resetTime,
  undoTakeOneFromStock,
  setUndoAction,
  undoRemoveCardFromPile,
  undoMoveFromStockToPiles,
  countScore,
  undoMoveFromStockToFoundation,
} from "../../../store/actions/";
import {
  ToolBar,
  TopbarButton,
  ToolButton,
  Separator,
} from "../../ui-components";
import { GameState, FoundationState } from "../../../store/reducers";
import { cardConfigType } from "../../../configs/cardTypes";
import { ToolDropdown } from "../../smart-components";
import styles from "./AppToolbar.module.scss";

type AppToolbarDispatchTypes = {
  dealCards: () => void;
  toggleCardBackWindow: (windowState: boolean, windowToToggle: string) => void;
  resetScore: () => void;
  stopGame: () => void;
  toggleAboutWindow: (windowState: boolean, windowToToggle: string) => void;
  resetStockCounter: () => void;
  setGameFinished: (gameState: boolean) => void;
  resetStateSavedTimers: () => void;
  undoTakeOneFromStock: (
    cardsOnStockUndo: cardConfigType[],
    cardsFromStockUndo: cardConfigType[]
  ) => void;
  setUndoAction: (clearUndoActions: []) => void;
  undoRemoveCardFromPile: (pilesState: {
    [key: string]: cardConfigType[];
  }) => void;
  undoMoveFromStockToPiles: (
    pilesState: { [key: string]: cardConfigType[] },
    cardsFromStockState: cardConfigType[]
  ) => void;
  substractScorePoints: (pointsToSubstract: number) => void;
  undoMoveFromStockToFoundation: (
    foundationState: { [key: string]: FoundationState },
    cardsFromStockState: {
      [key: string]: cardConfigType[];
    }
  ) => void;
};

type AppToolbarStateTypes = {
  actionToUndo: any;
};

type AppToolbarPropTypes = {
  gameVisible: boolean;
  helpVisible: boolean;
  setGameVisible: (prevState: boolean) => void;
  setHelpVisible: (prevState: boolean) => void;
  setBottomBarText: (text: string) => void;
};

const AppToolbarInternal: React.FC<
  AppToolbarDispatchTypes & AppToolbarPropTypes & AppToolbarStateTypes
> = (props) => {
  const {
    dealCards,
    toggleCardBackWindow,
    gameVisible,
    helpVisible,
    setGameVisible,
    setHelpVisible,
    setBottomBarText,
    resetScore,
    stopGame,
    toggleAboutWindow,
    resetStockCounter,
    setGameFinished,
    resetStateSavedTimers,
    undoTakeOneFromStock,
    actionToUndo,
    setUndoAction,
    undoRemoveCardFromPile,
    undoMoveFromStockToPiles,
    substractScorePoints,
    undoMoveFromStockToFoundation,
  } = props;

  return (
    <ToolBar>
      <div className={styles.topBarButtonContainer}>
        <div style={{ width: "100%" }}>
          <TopbarButton
            onClick={() => {
              setGameVisible(!gameVisible);
              setHelpVisible(false);
            }}
            buttonText={"Game"}
            id={"gameButton"}
          />
          <ToolDropdown visible={gameVisible} buttonId={"gameButton"}>
            <>
              <ToolButton
                onClick={() => {
                  dealCards();
                  resetScore();
                  resetStockCounter();
                  stopGame();
                  setGameVisible(!gameVisible);
                  setHelpVisible(false);
                  setGameFinished(false);
                  resetStateSavedTimers();
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
                disabled={!actionToUndo.length}
                onClick={() => {
                  setGameVisible(!gameVisible);
                  if (actionToUndo.length) {
                    if (actionToUndo[0] === "TAKE_ONE_FROM_STOCK") {
                      undoTakeOneFromStock(actionToUndo[1], actionToUndo[2]);
                    }
                    if (actionToUndo[0] === "ADD_CARD_TO_PILE") {
                      undoRemoveCardFromPile(actionToUndo[1]);
                    }
                    if (actionToUndo[0] === "FROM_STOCK_TO_PILE") {
                      substractScorePoints(-5);
                      undoMoveFromStockToPiles(
                        actionToUndo[1],
                        actionToUndo[2]
                      );
                    }
                    if (actionToUndo[0] === "FROM_STOCK_TO_FOUNDATION") {
                      substractScorePoints(-10);
                      undoMoveFromStockToFoundation(
                        actionToUndo[1],
                        actionToUndo[2]
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
          </ToolDropdown>
        </div>
        <div style={{ width: "100%" }}>
          <TopbarButton
            onClick={() => {
              setHelpVisible(!helpVisible);
              setGameVisible(false);
            }}
            buttonText={"Help"}
            id={"helpButton"}
          />
          <ToolDropdown visible={helpVisible} buttonId={"helpButton"}>
            <>
              <ToolButton
                onMouseOver={() =>
                  setBottomBarText("Index of Solitaire help topics")
                }
                onMouseLeave={() => setBottomBarText("")}
                text="Help Topics"
                disabled
              />
              <Separator />
              <ToolButton
                onMouseOver={() => setBottomBarText("About Solitaire")}
                onMouseLeave={() => setBottomBarText("")}
                onClick={() => {
                  toggleAboutWindow(true, "aboutWindow");
                  setHelpVisible(false);
                }}
                text="About"
              />
            </>
          </ToolDropdown>
        </div>
      </div>
    </ToolBar>
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
    dealCards: () => dispatch(dealCards()),
    resetScore: () => dispatch(resetScore()),
    resetStockCounter: () => dispatch(resetStockCounter()),
    stopGame: () => dispatch(stopGame()),
    toggleCardBackWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
    toggleAboutWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
    setGameFinished: (gameState: boolean) => dispatch(finishGame(gameState)),
    resetStateSavedTimers: () => dispatch(resetTime()),
    undoTakeOneFromStock: (
      cardsOnStockUndo: cardConfigType[],
      cardsFromStockUndo: cardConfigType[]
    ) => dispatch(undoTakeOneFromStock(cardsOnStockUndo, cardsFromStockUndo)),
    setUndoAction: (clearUndoActions: []) =>
      dispatch(setUndoAction(clearUndoActions)),
    undoRemoveCardFromPile: (pilesState: { [key: string]: cardConfigType[] }) =>
      dispatch(undoRemoveCardFromPile(pilesState)),
    undoMoveFromStockToPiles: (
      pilesState: { [key: string]: cardConfigType[] },
      cardsFromStockState: cardConfigType[]
    ) => dispatch(undoMoveFromStockToPiles(pilesState, cardsFromStockState)),
    substractScorePoints: (pointsToSubstract: number) =>
      dispatch(countScore(pointsToSubstract)),
    undoMoveFromStockToFoundation: (
      foundationState: { [key: string]: FoundationState },
      cardsFromStockState: {
        [key: string]: cardConfigType[];
      }
    ) =>
      dispatch(
        undoMoveFromStockToFoundation(foundationState, cardsFromStockState)
      ),
  };
};

export const AppToolbar = connect<
  AppToolbarStateTypes,
  AppToolbarDispatchTypes,
  AppToolbarPropTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(AppToolbarInternal);
