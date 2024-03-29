import React from "react";
import { SettingsWindow } from "../../../ui-components";
import questionIcon from "../../../../static/misc/questionHelpIcon.png";
import styles from "./HelpTopicsTextWindow.module.scss";
import { HowToPlay, ScoringInformation } from "./HelpTexts";

type HelpTopicsTextWindowPropTypes = {
  helpToDisplay?: string;
  toggleOffTextWindow: () => void;
};

export const HelpTopicsTextWindow: React.VFC<HelpTopicsTextWindowPropTypes> = ({
  helpToDisplay,
  toggleOffTextWindow,
}) => {
  return (
    <SettingsWindow
      windowTitle={"Solitaire Help"}
      visible={true}
      closeButtonAction={toggleOffTextWindow}
      width={450}
      positionOnWindow={[200, 500]}
      topBarIcon={questionIcon}
      iconHeight="18px"
    >
      <div className={styles.helpTopicsContainer}>
        {helpToDisplay === "How to play Solitaire" ? (
          <HowToPlay />
        ) : (
          <ScoringInformation />
        )}
      </div>
    </SettingsWindow>
  );
};
