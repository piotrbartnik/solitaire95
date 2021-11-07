import React from "react";
import { connect } from "react-redux";
import {
  toggleWindow,
  finishGame,
  countScore,
} from "../../../../../store/actions/";
import { ToolButton, Separator } from "../../../../ui-components";
import { dealCardsAllSteps } from "../../../../../helpers/dealCardsAllSteps";
import { UndoButton } from "./UndoButton";

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
  GameDropdownPropTypes & GameDropdownDispatchTypes
> = ({
  gameVisible,
  toggleCardBackWindow,
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
      <UndoButton
        setGameVisible={setGameVisible}
        gameVisible={gameVisible}
        setBottomBarText={setBottomBarText}
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
  undefined,
  GameDropdownDispatchTypes,
  GameDropdownPropTypes
>(
  undefined,
  mapDispatchToProps
)(GameDropdownInternal);
