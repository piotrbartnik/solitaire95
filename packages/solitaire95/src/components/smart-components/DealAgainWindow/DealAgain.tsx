import React, { useCallback } from "react";
import { connect } from "react-redux";
import {
  dealCards,
  toggleWindow,
  stopGame,
  resetScore,
  finishGame,
  resetTime,
} from "../../../store/actions/";
import { WindowsState } from "../../../store/reducers/";
import { SettingsWindow } from "../../ui-components";
import styles from "./DealAgain.module.scss";

export type DealAgainStateTypes = {
  isWindowVisible: boolean;
};
export type DealAgainDispatchTypes = {
  toggleDealWindow: (windowState: boolean, windowToToggle: string) => void;
  dealCards: () => void;
  stopGame: () => void;
  resetScore: () => void;
  setGameFinished: (gameState: boolean) => void;
  resetStateSavedTimers: () => void;
};

const DealAgainInternal: React.FC<
  DealAgainDispatchTypes & DealAgainStateTypes
> = (props) => {
  const {
    dealCards,
    isWindowVisible,
    toggleDealWindow,
    stopGame,
    resetScore,
    setGameFinished,
    resetStateSavedTimers,
  } = props;

  const dealWindowPositionX = window.innerWidth;
  const dealWindowPositionY = window.innerHeight;

  const yesActions = useCallback(() => {
    dealCards();
    stopGame();
    resetScore();
    toggleDealWindow(false, "dealAgainWindow");
    setGameFinished(false);
    resetStateSavedTimers();
  }, [
    dealCards,
    stopGame,
    resetScore,
    toggleDealWindow,
    setGameFinished,
    resetStateSavedTimers,
  ]);

  const closeActions = useCallback(
    () => toggleDealWindow(false, "dealAgainWindow"),
    [toggleDealWindow]
  );

  return (
    <SettingsWindow
      windowTitle={"Solitaire"}
      buttons={[
        {
          text: "Yes",
          onClick: yesActions,
        },
        {
          text: "No",
          onClick: closeActions,
        },
      ]}
      visible={isWindowVisible}
      width={"250px"}
      height={"150px"}
      positionOnWindow={[
        dealWindowPositionY / 2 - 75,
        dealWindowPositionX / 2 - 125,
      ]}
      closeButtonAction={closeActions}
    >
      <div className={styles.contentContainer}>Deal again?</div>
    </SettingsWindow>
  );
};

const mapStateToProps = (state: { toggleWindows: WindowsState }) => {
  return {
    isWindowVisible: state.toggleWindows.dealAgainWindow,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    dealCards: () => dispatch(dealCards()),
    toggleDealWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
    stopGame: () => dispatch(stopGame()),
    resetScore: () => dispatch(resetScore()),
    setGameFinished: (gameState: boolean) => dispatch(finishGame(gameState)),
    resetStateSavedTimers: () => dispatch(resetTime()),
  };
};

export const DealAgain = connect<DealAgainStateTypes, DealAgainDispatchTypes>(
  mapStateToProps,
  mapDispatchToProps
)(DealAgainInternal);
