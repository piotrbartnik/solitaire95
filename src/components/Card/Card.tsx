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

  const extractSuite = (
    frontName: string,
    targetSuite: string
  ): string | null => (frontName.includes(targetSuite) ? targetSuite : null);

  const possibleSuitesAndAdjacentColors: {
    [key: string]: string[];
  } = {
    red: ["Hearts", "Diamonds"],
    black: ["Clubs", "Spades"],
  };

  const possibleSuites: string[] = Object.keys(possibleSuitesAndAdjacentColors)
    .map((color) => possibleSuitesAndAdjacentColors[color])
    .reduce((acc, curr) => acc.concat(curr), []);

  const [cardSuite] = possibleSuites
    .map((el) => extractSuite(front, el))
    .filter(Boolean);

  const [cardColor] = Object.keys(possibleSuitesAndAdjacentColors)
    .map((el) =>
      possibleSuitesAndAdjacentColors[el].includes(String(cardSuite))
        ? el
        : null
    )
    .filter(Boolean);

  const [{ isDragging }, drag] = useDrag({
    item: { type: itemTypes.CARD, front, cardSuite, cardColor },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });

  const frontImage: string = cardFrontsImages[`${front}`];
  const backImage: string = cardBackImages[`${back}`];

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
          data-suite={cardSuite}
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
