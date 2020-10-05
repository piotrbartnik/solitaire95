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
  color: string;
  suite: string;
};

const Card: React.FC<propTypes> = (props: propTypes) => {
  const {
    front,
    back,
    isTurnedBack = true,
    onDoubleClick,
    pileNumber,
    color,
    suite,
  } = props;
  const [cardPosition, changeCardPosition] = useState(isTurnedBack);
  const [wasTurnedFront] = useState(!cardPosition ? true : false);

  const canDragCard = !cardPosition;

  useEffect(() => {
    if (!wasTurnedFront) changeCardPosition(isTurnedBack);
  }, [isTurnedBack, wasTurnedFront]);

  const onClick = () => {
    if (!wasTurnedFront) changeCardPosition(false);
  };

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: itemTypes.CARD,
      front,
      suite,
      color,
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
          data-suite={suite}
          data-color={color}
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
