import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import styles from "./Card.module.scss";
import { itemTypes } from "../../configs/dragndropConfig";
import { cardFrontsImages } from "../../static/cardsFronts/";
import { cardBackImages } from "../../static/cardBacks/";

type propTypes = {
  cardFront: string;
  cardColor: string;
  cardSuite: string;
  cardOrder: string | number;
  back: string;
  isTurnedBack?: boolean;
  onDoubleClick?: any;
  onClick?: any;
  pileNumber?: number;
  foundationNumber?: string;
  wasTurnedFront?: boolean;
  canBeTurned?: boolean;
};

const Card: React.FC<propTypes> = (props: propTypes) => {
  const {
    cardFront,
    back,
    isTurnedBack = true,
    onDoubleClick,
    pileNumber,
    foundationNumber,
    cardColor,
    cardSuite,
    cardOrder,
    canBeTurned,
  } = props;
  const [cardPosition, changeCardPosition] = useState(isTurnedBack);
  const [wasTurnedFront] = useState(!cardPosition ? true : false);

  const canDragCard = !cardPosition;

  useEffect(() => {
    if (!wasTurnedFront) changeCardPosition(isTurnedBack);
  }, [isTurnedBack, wasTurnedFront]);

  const onClick = () => {
    if (!wasTurnedFront && canBeTurned) changeCardPosition(false);
  };

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: itemTypes.CARD,
      cardFront,
      cardSuite,
      cardColor,
      pileNumber,
      cardPosition,
      cardOrder,
      foundationNumber,
    },
    canDrag: canDragCard,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });

  const frontImage: string = cardFrontsImages[`${cardFront}_${cardSuite}`];
  const backImage: string = cardBackImages[`${back}`];

  return (
    <div
      className={styles.card}
      onClick={onClick}
      onDoubleClick={!cardPosition ? onDoubleClick : undefined}
      ref={drag}
      style={isDragging ? { opacity: "0" } : undefined}
    >
      {!cardPosition ? (
        <div
          className={styles.cardFront}
          style={{ backgroundImage: `url(${frontImage})` }}
          data-cardname={cardFront}
          data-suite={cardSuite}
          data-color={cardColor}
          data-order={cardOrder}
          data-pilenumber={pileNumber}
          data-foundationnumber={foundationNumber}
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
