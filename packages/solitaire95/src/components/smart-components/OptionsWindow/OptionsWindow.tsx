import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import {
  toggleWindow,
  setOutlineDragging,
  toggleBottomBar,
  toggleTimer,
  dealCards,
  toggledrawType,
} from "../../../store/actions/";
import { WindowsState, GameState } from "../../../store/reducers/";
import { SettingsWindow } from "../../ui-components";
import { Checkbox, RadioBox, Radiobutton } from "../../ui-components/";
import styles from "./OptionsWindow.module.scss";

export type OptionsWindowStateTypes = {
  isWindowVisible?: boolean;
  outlineDragging: boolean;
  bottomBarVisible: boolean;
  timerVisible: boolean;
  drawType: string;
};

export type OptionsWindowDispatchTypes = {
  toggleOptionsWindow: (windowState: boolean, windowToToggle: string) => void;
  setOutlineDragging: (outlineDragging: boolean) => void;
  toggleBottomBar: (bottomBarVisible: boolean) => void;
  toggleTimer: (timerVisible: boolean) => void;
  dealCards: () => void;
  toggledrawType: (drawType: string) => void;
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
    dealCards,
    toggledrawType,
    drawType,
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
      dealCards();
    }
    if (toggleDrawTypeState !== drawType) {
      toggledrawType(toggleDrawTypeState);
      dealCards();
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
    dealCards,
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
                    Object.keys(drawRadioButtonsTypes)[index]
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    dealCards: () => dispatch(dealCards()),
    toggleOptionsWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
    setOutlineDragging: (isOutlined: boolean) =>
      dispatch(setOutlineDragging(isOutlined)),
    toggleBottomBar: (bottomBarVisible: boolean) =>
      dispatch(toggleBottomBar(bottomBarVisible)),
    toggleTimer: (timerVisible: boolean) => dispatch(toggleTimer(timerVisible)),
    toggledrawType: (drawType: string) => dispatch(toggledrawType(drawType)),
  };
};

export const Options = connect<
  OptionsWindowStateTypes,
  OptionsWindowDispatchTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(OptionsInternal);
