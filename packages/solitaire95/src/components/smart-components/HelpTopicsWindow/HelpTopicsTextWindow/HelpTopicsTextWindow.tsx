import React, { useState } from "react";
import { SettingsWindow } from "../../../ui-components";
import questionIcon from "../../../../static/misc/questionHelpIcon.png";

export const HelpTopicsTextWindow: React.VFC = () => {
  const [helpTextVisible, setHelpTextVisible] = useState(true);
  return (
    <SettingsWindow
      windowTitle={"Solitaire Help"}
      visible={helpTextVisible}
      closeButtonAction={() => setHelpTextVisible(false)}
      width={200}
      height={200}
      positionOnWindow={[10, 10]}
      topBarIcon={questionIcon}
      iconHeight="18px"
    >
      <div>Test</div>
    </SettingsWindow>
  );
};
