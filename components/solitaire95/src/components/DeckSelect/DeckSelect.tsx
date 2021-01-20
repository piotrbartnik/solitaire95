import React from "react";
import { SettingsWindow } from "../../UI";

const DeckSelect: React.FC = () => {
  const okOnClick = () => {
    alert("OK Clicked");
  };

  const cancelOnClick = () => {
    alert("Cancel Clicked");
  };

  return (
    <SettingsWindow
      windowTitle={"Select Card Back"}
      buttons={[
        { text: "OK", onClick: okOnClick },
        { text: "Cancel", onClick: cancelOnClick },
      ]}
    />
  );
};

export default DeckSelect;
