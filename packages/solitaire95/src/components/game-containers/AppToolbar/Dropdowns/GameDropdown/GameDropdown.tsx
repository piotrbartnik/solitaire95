import React, { useContext } from "react";
import { connect } from "react-redux";
import { VegasContext } from "../../../";
import { toggleWindow, finishGame } from "../../../../../store/actions/";
import {
  ToggleWindowType,
  FinishGameType,
  WindowTypes,
} from "../../../../../store/actions/actionTypes";
import { ToolButton, Separator } from "../../../../ui-components";
import { dealCardsAllSteps } from "../../../../../helpers/dealCardsAllSteps";
import { UndoButton } from "./UndoButton";
import { Dispatch } from "redux";

type GameDropdownDispatchTypes = {
  toggleCardBackWindow: ToggleWindowType;
  setGameFinished: FinishGameType;
  dealCardsAllSteps: (isVegas: boolean, keepVegasScore: boolean) => void;
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
  const { isVegas, keepVegasScore } = useContext(VegasContext);
  return (
    <>
      <ToolButton
        onClick={() => {
          setGameVisible(!gameVisible);
          setHelpVisible(false);
          setGameFinished(false);
          dealCardsAllSteps(isVegas, keepVegasScore);
        }}
        onMouseOver={() => setBottomBarText("Deal a new game")}
        onMouseLeave={() => setBottomBarText("")}
        text={
          <>
            <span>D</span>eal
          </>
        }
        label="Deal"
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
        text={
          <>
            De<span>c</span>k
          </>
        }
        label="Deck"
      />
      <ToolButton
        onClick={() => {
          toggleCardBackWindow(true, "optionsWindow");
          setGameVisible(false);
        }}
        onMouseOver={() => setBottomBarText("Change Solitaire options")}
        onMouseLeave={() => setBottomBarText("")}
        text={
          <>
            <span>O</span>ptions
          </>
        }
        label="Options"
      />
      <Separator />
      <ToolButton
        onMouseOver={() => setBottomBarText("Exit Solitaire")}
        onMouseLeave={() => setBottomBarText("")}
        text={
          <>
            E<span>x</span>it
          </>
        }
        disabled
        label="Exit"
      />
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    toggleCardBackWindow: (windowState: boolean, windowToToggle: WindowTypes) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
    setGameFinished: (gameState: boolean) => dispatch(finishGame(gameState)),
    dealCardsAllSteps: (isVegas: boolean, keepVegasScore: boolean) =>
      dealCardsAllSteps(dispatch, isVegas, keepVegasScore),
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
