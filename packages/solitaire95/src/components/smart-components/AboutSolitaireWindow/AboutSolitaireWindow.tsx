import React from "react";
import { connect } from "react-redux";
import { toggleWindow } from "../../../store/actions/";
import { WindowsState } from "../../../store/reducers/";
import { SettingsWindow } from "../../ui-components";
// import styles from "./DeckSelect.module.scss";

export type AboutSolitareStateTypes = {
  isWindowVisible?: boolean;
};
export type AboutSolitareDispatchTypes = {
  toggleAboutWindow: (windowState: boolean, windowToToggle: string) => void;
};

const AboutSolitareInternal: React.FC<
  AboutSolitareDispatchTypes & AboutSolitareStateTypes
> = (props) => {
  const { isWindowVisible, toggleAboutWindow } = props;

  const okOnClick = () => {
    toggleAboutWindow(false, "aboutWindow");
  };

  return (
    <SettingsWindow
      windowTitle={"About Solitare"}
      buttons={[{ text: "OK", onClick: okOnClick }]}
      visible={isWindowVisible as boolean}
      closeButtonAction={() => toggleAboutWindow(false, "aboutWindow")}
      width={"528px"}
    >
      About Solitaire
    </SettingsWindow>
  );
};

const mapStateToProps = (state: { toggleWindows: WindowsState }) => {
  return {
    isWindowVisible: state.toggleWindows.aboutWindow,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleAboutWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
  };
};

export const AboutSolitare = connect<
  AboutSolitareStateTypes,
  AboutSolitareDispatchTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(AboutSolitareInternal);
