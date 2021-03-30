import React from "react";
import { connect } from "react-redux";
import { Separator } from "../../ui-components";
import appIco from "../../../static/appIco.png";
import { toggleWindow } from "../../../store/actions/";
import { WindowsState } from "../../../store/reducers/";
import { SettingsWindow } from "../../ui-components";
import { useTimeSinceGameOpened } from "./AboutSolitaireWindowHooks";
import styles from "./AboutSolitaireWindow.module.scss";

export type AboutSolitaireWindowProps = {
  aboutChildren?: JSX.Element;
};

export type AboutSolitaireStateTypes = {
  isWindowVisible?: boolean;
};
export type AboutSolitaireDispatchTypes = {
  toggleAboutWindow: (windowState: boolean, windowToToggle: string) => void;
};

const AboutSolitaireInternal: React.FC<
  AboutSolitaireDispatchTypes &
    AboutSolitaireStateTypes &
    AboutSolitaireWindowProps
> = (props) => {
  const { isWindowVisible, toggleAboutWindow, aboutChildren } = props;

  const okOnClick = () => {
    toggleAboutWindow(false, "aboutWindow");
  };

  const timeInSecondsSinceGameOpened = useTimeSinceGameOpened();

  return (
    <SettingsWindow
      windowTitle={"About Solitaire"}
      buttons={[{ text: "OK", onClick: okOnClick }]}
      visible={isWindowVisible as boolean}
      closeButtonAction={() => toggleAboutWindow(false, "aboutWindow")}
      width={"528px"}
    >
      <div className={styles.container}>
        <img src={appIco} className={styles.gameIcon} />
        <div className={styles.textContainer}>
          <p>Solitaire</p>
          {aboutChildren}
          <Separator />
          <p>
            Time since opening Solitaire: {timeInSecondsSinceGameOpened} seconds
          </p>
          <p>Your operation system is: {window.navigator.platform}</p>
        </div>
      </div>
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

export const AboutSolitaire = connect<
  AboutSolitaireStateTypes,
  AboutSolitaireDispatchTypes,
  AboutSolitaireWindowProps
>(
  mapStateToProps,
  mapDispatchToProps
)(AboutSolitaireInternal);
