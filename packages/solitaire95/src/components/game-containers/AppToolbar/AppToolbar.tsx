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
import { dealCardsAllSteps } from "../../../helpers/dealCardsAllSteps";
import styles from "./AppToolbar.module.scss";

type AppToolbarDispatchTypes = {
  toggleCardBackWindow: (windowState: boolean, windowToToggle: string) => void;
  toggleAboutWindow: (windowState: boolean, windowToToggle: string) => void;
  setGameFinished: (gameState: boolean) => void;
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
  substractScorePoints: (pointsToSubstract: number) => void;
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
  dealCardsAllSteps: () => void;
};

type AppToolbarStateTypes = {
  actionToUndo: UndoActionType;
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
    toggleCardBackWindow,
    gameVisible,
    helpVisible,
    setGameVisible,
    setHelpVisible,
    setBottomBarText,
    toggleAboutWindow,
    setGameFinished,
    undoTakeOneFromStock,
    actionToUndo,
    setUndoAction,
    undoRemoveCardFromPile,
    undoMoveFromStockToPiles,
    substractScorePoints,
    undoMoveFromStockToFoundation,
    undoMoveFromPileToFoundation,
    undoMoveFromFoundationToPiles,
    undoThreeCardsFromStock,
    dealCardsAllSteps,
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
            active={gameVisible}
            onMouseOver={() => {
              if (helpVisible) {
                setGameVisible(!gameVisible);
                setHelpVisible(false);
              }
            }}
          />
          <ToolDropdown visible={gameVisible} buttonId={"gameButton"}>
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
            active={helpVisible}
            onMouseOver={() => {
              if (gameVisible) {
                setHelpVisible(!helpVisible);
                setGameVisible(false);
              }
            }}
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
    toggleCardBackWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
    toggleAboutWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
    setGameFinished: (gameState: boolean) => dispatch(finishGame(gameState)),
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
    dealCardsAllSteps: () => dealCardsAllSteps(dispatch),
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
