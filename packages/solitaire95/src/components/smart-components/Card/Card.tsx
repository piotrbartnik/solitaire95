import React from "react";
import { useDrag } from "react-dnd";
import { useSetCardPosition } from "./CardHooks";
import { itemTypes } from "../../../configs/dragndropConfig";
import { cardFrontsImages } from "../../../static/cardsFronts";
import { cardBackImages } from "../../../static/cardBacks";
import styles from "./Card.module.scss";

type CardPropTypes = {
  cardFront: string;
  cardColor: string;
  cardSuite: string;
  cardOrder: string | number;
  cardBack: string;
  isTurnedBack?: boolean;
  onDoubleClick?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  pileNumber?: number;
  foundationNumber?: string;
  wasCardTurnedFront?: boolean;
  canBeTurned?: boolean;
};

export const Card: React.FC<CardPropTypes> = (props) => {
  const {
    cardFront,
    cardBack,
    isTurnedBack = true,
    onDoubleClick,
    pileNumber,
    foundationNumber,
    cardColor,
    cardSuite,
    cardOrder,
    canBeTurned,
  } = props;

  const [
    cardPositionFront,
    wasCardTurnedFront,
    changeCardPosition,
  ] = useSetCardPosition(isTurnedBack);

  const canDragCard = !cardPositionFront;

  const onClick = () => {
    if (!wasCardTurnedFront && canBeTurned) {
      changeCardPosition(() => false);
    }
  };

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: itemTypes.CARD,
      cardFront,
      cardSuite,
      cardColor,
      pileNumber,
      cardPositionFront,
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
  const backImage: string = cardBackImages[`${cardBack}`];

  return (
    <div
      className={styles.card}
      onClick={onClick}
      onDoubleClick={!cardPositionFront ? onDoubleClick : undefined}
      ref={drag}
      style={isDragging ? { opacity: "0" } : undefined}
      data-front={!cardPositionFront}
    >
      {!cardPositionFront ? (
        <div
          className={styles.cardFront}
          style={{ backgroundImage: `url(${frontImage})` }}
          data-cardname={cardFront}
          data-suite={cardSuite}
          data-color={cardColor}
          data-order={cardOrder}
          data-pilenumber={pileNumber}
          data-foundationnumber={foundationNumber}
          data-cardback={cardBack}
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
