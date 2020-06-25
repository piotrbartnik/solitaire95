import React, { useState } from "react";
import styles from "./Card.module.scss";
import { acorns } from "../../static/cardBacks/";
import { kingOfHearts } from "../../static/cardsFronts";

type propTypes = {
  front: string;
  back: string;
  isTurnedBack: boolean;
};

const Card: React.FC<propTypes> = (props: propTypes) => {
  const { front, back, isTurnedBack = true } = props;
  const [cardPosition, changeCardPosition] = useState(isTurnedBack);

  let frontDeck;
  if (front === "kingOfHearts") {
    frontDeck = kingOfHearts;
  }

  let backDeck;
  if (back === "acorns") {
    backDeck = acorns;
  }

  const flipCard = () => {
    changeCardPosition((cardPosition) => !cardPosition);
  };

  return (
    <div className={styles.card} onClick={flipCard}>
      {!cardPosition ? (
        <div
          className={styles.cardFront}
          style={{ backgroundImage: `url(${frontDeck})` }}
        ></div>
      ) : (
        <div
          className={styles.cardBack}
          style={{ backgroundImage: `url(${backDeck})` }}
        ></div>
      )}
    </div>
  );
};

export default Card;
