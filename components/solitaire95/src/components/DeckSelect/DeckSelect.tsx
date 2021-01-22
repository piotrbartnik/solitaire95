import React, { useContext } from "react";
import { CardBackContext } from "../../containers/";
import { SettingsWindow } from "../../UI";
import styles from "./DeckSelect.module.scss";

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
    >
      <div className={styles.deckContainer}>
        <div className={styles.deckContainer__cardBackContainer}>
          <div className={styles.deckContainer__cardBack} tabIndex={1} />
          <div className={styles.deckContainer__cardBack} tabIndex={1} />
          <div className={styles.deckContainer__cardBack} tabIndex={1} />
          <div className={styles.deckContainer__cardBack} tabIndex={1} />
          <div className={styles.deckContainer__cardBack} tabIndex={1} />
        </div>
        <div className={styles.deckContainer__cardBackContainer}>
          <div className={styles.deckContainer__cardBack} tabIndex={1} />
          <div className={styles.deckContainer__cardBack} tabIndex={1} />
          <div className={styles.deckContainer__cardBack} tabIndex={1} />
          <div className={styles.deckContainer__cardBack} tabIndex={1} />
          <div className={styles.deckContainer__cardBack} tabIndex={1} />
        </div>
      </div>
    </SettingsWindow>
  );
};

export default DeckSelect;
