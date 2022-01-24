import React, { useState } from "react";
import { SettingsWindow } from "../../../ui-components";

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
    >
      <div>Test</div>
    </SettingsWindow>
  );
};
