import React, { useState } from "react";
import styles from "./Card.module.scss";
import { cardFrontsImages } from "../../static/cardsFronts/";
import { cardBackImages } from "../../static/cardBacks/";

type propTypes = {
  front: string;
  back: string;
  isTurnedBack: boolean;
  onDoubleClick?: any;
  onClick?: any;
};

const Card: React.FC<propTypes> = (props: propTypes) => {
  const { front, back, isTurnedBack = true, onDoubleClick, onClick } = props;
  const [cardPosition] = useState(isTurnedBack);

  const frontImage: string = cardFrontsImages[`${front}`];
  const backImage: string = cardBackImages[`${back}`];

  let cardColor: string = "";

  if (front.includes("Hearts")) cardColor = "hearts";
  if (front.includes("Clubs")) cardColor = "clubs";
  if (front.includes("Diamonds")) cardColor = "diamonds";
  if (front.includes("Spades")) cardColor = "spades";

  return (
    <div
      className={styles.card}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {!cardPosition ? (
        <div
          className={styles.cardFront}
          style={{ backgroundImage: `url(${frontImage})` }}
          data-cardname={front}
          data-color={cardColor}
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
