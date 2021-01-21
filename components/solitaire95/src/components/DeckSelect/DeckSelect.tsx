import React, { useContext } from "react";
import { CardBackContext } from "../../containers/";
import { SettingsWindow } from "../../UI";

const DeckSelect: React.FC = () => {
  const { setCardBackImage } = useContext(CardBackContext);
  const okOnClick = () => {
    const cardBacks = [
      "acorns",
      "beach",
      "castle",
      "fish1",
      "fish2",
      "magic",
      "mosaic1",
      "mosaic2",
      "robo",
      "shell",
    ];
    setCardBackImage(cardBacks[Math.floor(Math.random() * 10)]);
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
