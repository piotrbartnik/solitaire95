import React, { useState } from "react";
import { SettingsWindow } from "../../../ui-components";
import questionIcon from "../../../../static/misc/questionHelpIcon.png";
import styles from "./HelpTopicsTextWindow.module.scss";
import { howToPlay } from "./HelpTexts";

export const HelpTopicsTextWindow: React.VFC = () => {
  const [helpTextVisible, setHelpTextVisible] = useState(true);
  return (
    <SettingsWindow
      windowTitle={"Solitaire Help"}
      visible={helpTextVisible}
      closeButtonAction={() => setHelpTextVisible(false)}
      width={400}
      height={600}
      positionOnWindow={[10, 10]}
      topBarIcon={questionIcon}
      iconHeight="18px"
    >
      <div className={styles.helpTopicsContainer}>{howToPlay}</div>
    </SettingsWindow>
  );
};
