import React, { useState } from "react";
import { Card } from "../";
import { cardTypes } from "../../configs/cardTypes";
import styles from "./CardPile.module.scss";

const CardPile: React.FC = () => {
  const [cardsOnPile, takeOneFromPile] = useState<string[]>(cardTypes);
  const [cardsTaken, cardsOnTable] = useState<string[]>([]);

  const moveFirstFromTheTop = () => {
    if (cardsOnPile.length) {
      const cardToPush: any = cardsOnPile.pop();
      takeOneFromPile([...cardsOnPile]);
      cardsOnTable([...cardsTaken, cardToPush]);
    } else {
      takeOneFromPile(cardsTaken.reverse());
      cardsOnTable([]);
    }
  };

  return (
    <>
      <div className={styles.cardPile} onClick={moveFirstFromTheTop}>
        <div className={styles.cardPile__cardHolder}>
          {cardsOnPile.length
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
