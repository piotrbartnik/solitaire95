import React from "react";
import { SettingsWindow } from "../../../ui-components";
import questionIcon from "../../../../static/misc/questionHelpIcon.png";
import styles from "./HelpTopicsTextWindow.module.scss";
import { HowToPlay } from "./HelpTexts";

type HelpTopicsTextWindowPropTypes = {
  textWindowVisible: boolean;
  helpToDisplay?: string;
  toggleOffTextWindow: () => void;
};

export const HelpTopicsTextWindow: React.VFC<HelpTopicsTextWindowPropTypes> = ({
  textWindowVisible,
  // helpToDisplay,
  toggleOffTextWindow,
}) => {
  return (
    <SettingsWindow
      windowTitle={"Solitaire Help"}
      visible={textWindowVisible}
      closeButtonAction={toggleOffTextWindow}
      width={450}
      positionOnWindow={[200, 500]}
      topBarIcon={questionIcon}
      iconHeight="18px"
    >
      <div className={styles.helpTopicsContainer}>
        <HowToPlay />
      </div>
    </SettingsWindow>
  );
};
