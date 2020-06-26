import React, { useState } from "react";
import styles from "./Card.module.scss";
import { cardFrontsImages } from "../../static/cardsFronts/";
import { cardBackImages } from "../../static/cardBacks/";

type propTypes = {
  front: string;
  back: string;
  isTurnedBack: boolean;
};

const Card: React.FC<propTypes> = (props: propTypes) => {
  const { front, back, isTurnedBack = true } = props;
  const [cardPosition, changeCardPosition] = useState(isTurnedBack);

  const flipCard = () => {
    changeCardPosition((cardPosition) => !cardPosition);
  };

  const frontImage: string = cardFrontsImages[`${front}`];
  const backImage: string = cardBackImages[`${back}`];

  return (
    <div className={styles.card} onClick={flipCard}>
      {!cardPosition ? (
        <div
          className={styles.cardFront}
          style={{ backgroundImage: `url(${frontImage})` }}
        ></div>
      ) : (
        <div
          className={styles.cardBack}
          style={{ backgroundImage: `url(${backImage})` }}
        ></div>
      )}
    </div>
  );
};

export default Card;
