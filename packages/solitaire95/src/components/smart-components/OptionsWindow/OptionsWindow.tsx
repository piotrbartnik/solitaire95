import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  toggleWindow,
  setOutlineDragging,
  toggleBottomBar,
  toggleTimer,
  toggledrawType,
} from "../../../store/actions/";
import {
  ToggleWindowType,
  SetOutlineDraggingType,
  ToggleBottomBarType,
  ToggleTimerType,
  ToggleDrawType,
  WindowTypes,
  DrawType,
} from "../../../store/actions/actionTypes";
import { WindowsState, GameState } from "../../../store/reducers/";
import { SettingsWindow } from "../../ui-components";
import { Checkbox, RadioBox, Radiobutton } from "../../ui-components/";
import styles from "./OptionsWindow.module.scss";
import { dealCardsAllSteps } from "../../../helpers/dealCardsAllSteps";

export type OptionsWindowStateTypes = {
  isWindowVisible?: boolean;
  outlineDragging: boolean;
  bottomBarVisible: boolean;
  timerVisible: boolean;
  drawType: DrawType;
};

export type OptionsWindowDispatchTypes = {
  toggleOptionsWindow: ToggleWindowType;
  setOutlineDragging: SetOutlineDraggingType;
  toggleBottomBar: ToggleBottomBarType;
  toggleTimer: ToggleTimerType;
  toggledrawType: ToggleDrawType;
  dealCardsAllSteps: () => void;
};

const OptionsInternal: React.FC<
  OptionsWindowStateTypes & OptionsWindowDispatchTypes
> = (props) => {
  const {
    isWindowVisible,
    toggleOptionsWindow,
    setOutlineDragging,
    outlineDragging,
    bottomBarVisible,
    toggleBottomBar,
    timerVisible,
    toggleTimer,
    toggledrawType,
    drawType,
    dealCardsAllSteps,
  } = props;
  const [isDragOutline, setDragOutline] = useState(outlineDragging);
  const [scoringType, setScoringType] = useState("Standard");
  const [bottomBarVisibleState, setBottomBarVisibleState] =
    useState(bottomBarVisible);
  const [timerVisibleState, setTimerVisibleSrate] = useState(timerVisible);
  const [toggleDrawTypeState, setToggleDrawTypeState] = useState(drawType);

  const onOkClick = useCallback(() => {
    toggleOptionsWindow(false, "optionsWindow");
    toggleBottomBar(bottomBarVisibleState);
    if (timerVisibleState !== timerVisible) {
      toggleTimer(timerVisibleState);
      dealCardsAllSteps();
    }
    if (toggleDrawTypeState !== drawType) {
      toggledrawType(toggleDrawTypeState);
      dealCardsAllSteps();
    }
  }, [
    toggleOptionsWindow,
    toggleBottomBar,
    bottomBarVisibleState,
    timerVisibleState,
    timerVisible,
    toggleDrawTypeState,
    drawType,
    toggleTimer,
    dealCardsAllSteps,
    toggledrawType,
  ]);

  const closeButtonAction = useCallback(
    () => toggleOptionsWindow(false, "optionsWindow"),
    [toggleOptionsWindow]
  );

  const cancelButtonAction = useCallback(() => {
    toggleOptionsWindow(false, "optionsWindow");
  }, [toggleOptionsWindow]);

  const drawRadioButtonsTypes = {
    drawOne: "Draw one",
    drawThree: "Draw three",
  };
  const scoringRadioButtonsTypes = ["Standard", "Vegas", "None"];

  return (
    <SettingsWindow
      windowTitle={"Options"}
      buttons={[
        { text: "OK", onClick: onOkClick },
        { text: "Cancel", onClick: cancelButtonAction },
      ]}
      visible={isWindowVisible as boolean}
      closeButtonAction={closeButtonAction}
      width={528}
      height={330}
    >
      <div className={styles.radioWrapper__outer}>
        <RadioBox width={240} heigth={120} title="Draw">
          <div className={styles.radioWrapper__inner}>
            {Object.values(drawRadioButtonsTypes).map((radioType, index) => (
              <Radiobutton
                label={radioType}
                onClick={() => {
                  setToggleDrawTypeState(
                    Object.keys(drawRadioButtonsTypes)[index] as DrawType
                  );
                }}
                currentValue={drawRadioButtonsTypes[toggleDrawTypeState]}
                key={radioType}
              />
            ))}
          </div>
        </RadioBox>
        <RadioBox width={240} heigth={120} title="Scoring">
          <div className={styles.radioWrapper__inner}>
            {scoringRadioButtonsTypes.map((radioType) => (
              <Radiobutton
                label={radioType}
                onClick={() => setScoringType(radioType)}
                currentValue={scoringType}
                key={radioType}
              />
            ))}
          </div>
        </RadioBox>
      </div>
      <div className={styles.checkboxWrapper}>
        <Checkbox
          label="Timed game"
          id="timedGame"
          checked={timerVisible}
          onClick={() => {
            setTimerVisibleSrate(!timerVisible);
          }}
        />
        <Checkbox
          label="Outline dragging"
          id="outlineDragging"
          checked={isDragOutline}
          onClick={() => {
            setDragOutline(!isDragOutline);
            setOutlineDragging(!isDragOutline);
          }}
        />
        <Checkbox
          label="Status bar"
          id="statusBar"
          checked={bottomBarVisible}
          onClick={() => {
            setBottomBarVisibleState(!bottomBarVisible);
          }}
        />
        <Checkbox
          label="Keep score"
          id="keepScore"
          checked={false}
          onClick={() => {
            console.log("keepScore");
          }}
          disabled
        />
      </div>
    </SettingsWindow>
  );
};

const mapStateToProps = (state: {
  toggleWindows: WindowsState;
  gameState: GameState;
}) => {
  return {
    isWindowVisible: state.toggleWindows.optionsWindow,
    outlineDragging: state.gameState.outlineDragging,
    bottomBarVisible: state.gameState.bottomBarVisible,
    timerVisible: state.gameState.timerVisible,
    drawType: state.gameState.drawType,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dealCardsAllSteps: () => dealCardsAllSteps(dispatch),
    toggleOptionsWindow: (windowState: boolean, windowToToggle: WindowTypes) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
    setOutlineDragging: (isOutlined: boolean) =>
      dispatch(setOutlineDragging(isOutlined)),
    toggleBottomBar: (bottomBarVisible: boolean) =>
      dispatch(toggleBottomBar(bottomBarVisible)),
    toggleTimer: (timerVisible: boolean) => dispatch(toggleTimer(timerVisible)),
    toggledrawType: (drawType: DrawType) => dispatch(toggledrawType(drawType)),
  };
};

export const Options = connect<
  OptionsWindowStateTypes,
  OptionsWindowDispatchTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(OptionsInternal);
