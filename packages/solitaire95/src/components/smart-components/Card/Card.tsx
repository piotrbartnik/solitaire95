import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
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
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  positionOnPile?: number;
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
    onClick,
    positionOnPile,
  } = props;

  const canDragCard = !isTurnedBack;

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: itemTypes.CARD,
      cardFront,
      cardSuite,
      cardColor,
      pileNumber,
      cardOrder,
      foundationNumber,
    },
    canDrag: canDragCard,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  });

  const frontImage: string = cardFrontsImages[`${cardFront}_${cardSuite}`];
  const backImage: string = cardBackImages[`${cardBack}`];

  return (
    <div
      className={styles.card}
      onClick={onClick}
      onDoubleClick={!isTurnedBack ? onDoubleClick : undefined}
      ref={drag}
      style={isDragging ? { opacity: "0" } : undefined}
      data-front={!isTurnedBack}
      data-pilenumber={pileNumber}
      data-positiononpile={positionOnPile}
    >
      {!isTurnedBack ? (
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
