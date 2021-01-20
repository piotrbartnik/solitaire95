import React from "react";
import { SettingsWindow } from "../../UI";

const DeckSelect: React.FC = () => {
  return (
    <SettingsWindow
      windowTitle={"Select Card Back"}
      buttons={["OK", "Cancel"]}
    />
  );
};

export default DeckSelect;
