import React, { useState } from "react";
import { useDrag } from "react-dnd";
import styles from "./Card.module.scss";
import { itemTypes } from "../../configs/dragndropConfig";
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
  const [{ isDragging }, drag] = useDrag({
    item: { type: itemTypes.CARD, front: front },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });

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
      ref={drag}
      style={isDragging ? { opacity: "0" } : undefined}
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
