import React from "react";
import { SettingsWindow } from "../../../ui-components";

export const HelpTopicsTextWindow: React.VFC = () => {
  return (
    <SettingsWindow
      windowTitle={"Solitaire Help"}
      visible={true}
      // closeButtonAction={closeButtonActionCallback}
      width={600}
      height={600}
    >
      <div>Test</div>
    </SettingsWindow>
  );
};
