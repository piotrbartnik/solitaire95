import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { toggleWindow, setOutlineDragging } from "../../../store/actions/";
import { WindowsState, GameState } from "../../../store/reducers/";
import { SettingsWindow } from "../../ui-components";
import { Checkbox } from "../../ui-components/Checkbox/Checkbox";
// import styles from "./OptionsWindow.module.scss";

export type OptionsWindowStateTypes = {
  isWindowVisible?: boolean;
  outlineDragging: boolean;
};

export type OptionsWindowDispatchTypes = {
  toggleOptionsWindow: (windowState: boolean, windowToToggle: string) => void;
  setOutlineDragging: (outlineDragging: boolean) => void;
};

const OptionsInternal: React.FC<
  OptionsWindowStateTypes & OptionsWindowDispatchTypes
> = (props) => {
  const {
    isWindowVisible,
    toggleOptionsWindow,
    setOutlineDragging,
    outlineDragging,
  } = props;
  const [isDragOutline, setDragOutline] = useState(outlineDragging);

  const okOnClick = () => {
    toggleOptionsWindow(false, "optionsWindow");
  };
  const closeButtonActionCallback = useCallback(
    () => toggleOptionsWindow(false, "optionsWindow"),
    [toggleOptionsWindow]
  );

  return (
    <SettingsWindow
      windowTitle={"Options"}
      buttons={[
        { text: "OK", onClick: okOnClick },
        { text: "Cancel", onClick: okOnClick },
      ]}
      visible={isWindowVisible as boolean}
      closeButtonAction={closeButtonActionCallback}
      width={"528px"}
    >
      <Checkbox
        label="Outline dragging"
        id="outlineDragging"
        checked={isDragOutline}
        onClick={() => {
          setDragOutline(!isDragOutline);
          setOutlineDragging(!isDragOutline);
        }}
      />
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
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleOptionsWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
    setOutlineDragging: (isOutlined: boolean) =>
      dispatch(setOutlineDragging(isOutlined)),
  };
};

export const Options = connect<
  OptionsWindowStateTypes,
  OptionsWindowDispatchTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(OptionsInternal);
