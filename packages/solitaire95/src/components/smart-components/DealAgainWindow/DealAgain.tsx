import React, { useCallback, useContext } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { toggleWindow, finishGame } from "../../../store/actions/";
import {
  ToggleWindowType,
  FinishGameType,
  WindowTypes,
} from "../../../store/actions/actionTypes";
import { WindowsState } from "../../../store/reducers/";
import { SettingsWindow } from "../../ui-components";
import { VegasContext } from "../../game-containers";
import styles from "./DealAgain.module.scss";
import { dealCardsAllSteps } from "../../../helpers/dealCardsAllSteps";

export type DealAgainStateTypes = {
  isWindowVisible: boolean;
};
export type DealAgainDispatchTypes = {
  toggleDealWindow: ToggleWindowType;
  setGameFinished: FinishGameType;
  dealCardsAllSteps: (isVegas: boolean, keepVegasScore: boolean) => void;
};

const DealAgainInternal: React.FC<
  DealAgainDispatchTypes & DealAgainStateTypes
> = (props) => {
  const {
    isWindowVisible,
    toggleDealWindow,
    setGameFinished,
    dealCardsAllSteps,
  } = props;

  const { isVegas, keepVegasScore } = useContext(VegasContext);

  const dealWindowPositionX = window.innerWidth;
  const dealWindowPositionY = window.innerHeight;

  const yesActions = useCallback(() => {
    toggleDealWindow(false, "dealAgainWindow");
    setGameFinished(false);
    dealCardsAllSteps(isVegas, keepVegasScore);
  }, [
    toggleDealWindow,
    setGameFinished,
    dealCardsAllSteps,
    isVegas,
    keepVegasScore,
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
      width={255}
      height={155}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dealCardsAllSteps: (isVegas: boolean, keepVegasScore: boolean) =>
      dealCardsAllSteps(dispatch, isVegas, keepVegasScore),
    toggleDealWindow: (windowState: boolean, windowToToggle: WindowTypes) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
    setGameFinished: (gameState: boolean) => dispatch(finishGame(gameState)),
  };
};

export const DealAgain = connect<DealAgainStateTypes, DealAgainDispatchTypes>(
  mapStateToProps,
  mapDispatchToProps
)(DealAgainInternal);
