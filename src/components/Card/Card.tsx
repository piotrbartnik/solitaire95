import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import styles from "./Card.module.scss";
import { itemTypes } from "../../configs/dragndropConfig";
import { cardFrontsImages } from "../../static/cardsFronts/";
import { cardBackImages } from "../../static/cardBacks/";

type propTypes = {
  front: string;
  back: string;
  isTurnedBack?: boolean;
  onDoubleClick?: any;
  onClick?: any;
  pileNumber?: number;
  wasTurnedFront?: boolean;
};

const Card: React.FC<propTypes> = (props: propTypes) => {
  const { front, back, isTurnedBack = true, onDoubleClick, pileNumber } = props;
  const [cardPosition, changeCardPosition] = useState(isTurnedBack);
  const [wasTurnedFront] = useState(!cardPosition ? true : false);

  const canDragCard = !cardPosition;

  useEffect(() => {
    if (!wasTurnedFront) changeCardPosition(isTurnedBack);
  }, [isTurnedBack, wasTurnedFront]);

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

  const onClick = () => {
    if (!wasTurnedFront) changeCardPosition(false);
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
    item: {
      type: itemTypes.CARD,
      front,
      cardSuite,
      cardColor,
      pileNumber,
      cardPosition,
    },
    canDrag: canDragCard,
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
          data-pilenumber={pileNumber}
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
