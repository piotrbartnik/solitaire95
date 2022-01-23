import React from "react";
import { SettingsWindow } from "../../../ui-components";

export const HelpTopicsTextWindow: React.VFC = () => {
  return (
    <SettingsWindow
      windowTitle={"Solitaire Help"}
      visible={true}
      // closeButtonAction={closeButtonActionCallback}
      width={200}
      height={200}
      positionOnWindow={[0, 0]}
    >
      <div>Test</div>
    </SettingsWindow>
  );
};
