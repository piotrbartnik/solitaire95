import React, { useContext, useState } from "react";
import { CardBackContext } from "../../containers/";
import { SettingsWindow } from "../../UI";
import { cardBackImages } from "../../static/cardBacks/";
import styles from "./DeckSelect.module.scss";

console.log(cardBackImages);

const DeckSelect: React.FC = () => {
  const [selectedCardBack, setSelectedCardBack] = useState("");
  const { setCardBackImage } = useContext(CardBackContext);
  const okOnClick = () => {
    selectedCardBack ? setCardBackImage(selectedCardBack) : undefined;
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
    >
      <div className={styles.deckContainer}>
        <div className={styles.deckContainer__cardBackContainer}>
          {Object.keys(cardBackImages).map((cardBack, index) => (
            <div
              key={index}
              className={styles.deckContainer__cardBack}
              tabIndex={1}
              style={{ backgroundImage: `url(${cardBackImages[cardBack]})` }}
              onClick={() => setSelectedCardBack(cardBack)}
              onDoubleClick={() => setCardBackImage(cardBack)}
            />
          ))}
        </div>
      </div>
    </SettingsWindow>
  );
};

export default DeckSelect;
