import React, { useState } from "react";
import styles from "./Card.module.scss";
import { acorns } from "../../static/cardBacks/";
import { kingOfHearts } from "../../static/cardsFronts";

const Card: React.FC = () => {
  const [cardPosition, changeCardPosition] = useState(true);

  const flipCard = () => {
    changeCardPosition((cardPosition) => !cardPosition);
  };

  return (
    <div className={styles.card} onClick={flipCard}>
      {cardPosition ? (
        <div
          className={styles.cardFront}
          style={{ backgroundImage: `url(${kingOfHearts})` }}
        ></div>
      ) : (
        <div
          className={styles.cardBack}
          style={{ backgroundImage: `url(${acorns})` }}
        ></div>
      )}
    </div>
  );
};

export default Card;
