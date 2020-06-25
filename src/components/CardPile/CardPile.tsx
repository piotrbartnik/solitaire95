import React, { useState } from "react";
import { Card } from "../";
import { cardTypes } from "../../configs/cardTypes";
import styles from "./CardPile.module.scss";

const CardPile: React.FC = () => {
  const [cardsOnPile, takeOneFromPile] = useState<any[]>(cardTypes);
  const [cardsTaken, cardsOnTable] = useState<string[]>([]);

  const moveFirstFromTheTop = () => {
    const cardToPush: string = cardsOnPile.pop();
    takeOneFromPile([...cardsOnPile]);
    cardsOnTable([...cardsTaken, cardToPush]);
  };

  return (
    <>
      <div className={styles.cardPile}>
        <div className={styles.cardPile__circle}></div>
        <div
          className={styles.cardPile__cardHolder}
          onClick={moveFirstFromTheTop}
        >
          {cardsOnPile
            ? cardsOnPile.map((el) => (
                <Card front={el} back={"acorns"} isTurnedBack={true} />
              ))
            : null}
        </div>
      </div>
      <div className={styles.cardsOnTable}>
        {cardsTaken.map((el) => (
          <Card front={el} back={"acorns"} isTurnedBack={false} />
        ))}
      </div>
    </>
  );
};

export default CardPile;
