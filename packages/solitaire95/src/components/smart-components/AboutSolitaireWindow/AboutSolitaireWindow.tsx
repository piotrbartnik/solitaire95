import React from "react";
import { connect } from "react-redux";
import { Separator } from "../../ui-components";
import appIco from "../../../static/appIco.png";
import { toggleWindow } from "../../../store/actions/";
import { WindowsState } from "../../../store/reducers/";
import { SettingsWindow } from "../../ui-components";
import { useTimeSinceGameOpened } from "./AboutSolitareWindowHooks";
import styles from "./AboutSolitaireWindow.module.scss";

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

  const timeInSecondsSinceGameOpened = useTimeSinceGameOpened();

  return (
    <SettingsWindow
      windowTitle={"About Solitare"}
      buttons={[{ text: "OK", onClick: okOnClick }]}
      visible={isWindowVisible as boolean}
      closeButtonAction={() => toggleAboutWindow(false, "aboutWindow")}
      width={"528px"}
    >
      <div className={styles.container}>
        <img src={appIco} className={styles.gameIcon} />
        <div className={styles.textContainer}>
          <p>Solitaire</p>
          <p>Windows 95 Solitaire remake in React</p>
          <p>
            developed by{" "}
            <a
              href="https://www.linkedin.com/in/piotr-bartnik/"
              target="blank"
              rel="noopener noreferrer"
            >
              Piotr Bartnik
            </a>
          </p>
          <p>
            <a
              href="https://github.com/piotrbartnik/solitaire95"
              target="blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </p>
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

export const AboutSolitare = connect<
  AboutSolitareStateTypes,
  AboutSolitareDispatchTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(AboutSolitareInternal);
