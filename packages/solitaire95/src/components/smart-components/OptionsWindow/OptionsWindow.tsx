import React, { useCallback } from "react";
import { connect } from "react-redux";
import { toggleWindow } from "../../../store/actions/";
import { WindowsState } from "../../../store/reducers/";
import { SettingsWindow } from "../../ui-components";
// import styles from "./OptionsWindow.module.scss";

export type OptionsWindowStateTypes = {
  isWindowVisible?: boolean;
};

export type OptionsWindowDispatchTypes = {
  toggleOptionsWindow: (windowState: boolean, windowToToggle: string) => void;
};

const OptionsInternal: React.FC<
  OptionsWindowStateTypes & OptionsWindowDispatchTypes
> = (props) => {
  const { isWindowVisible, toggleOptionsWindow } = props;

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
      Options
    </SettingsWindow>
  );
};

const mapStateToProps = (state: { toggleWindows: WindowsState }) => {
  return {
    isWindowVisible: state.toggleWindows.optionsWindow,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleOptionsWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
  };
};

export const Options = connect<
  OptionsWindowStateTypes,
  OptionsWindowDispatchTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(OptionsInternal);
