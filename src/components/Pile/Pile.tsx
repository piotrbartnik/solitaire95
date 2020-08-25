import React from "react";
import { Card } from "..";
import styles from "./Pile.module.scss";

type propTypes = {
  cardsOnPile: string[];
  pileIndex: number;
};

const Pile: React.FC<propTypes> = (props: propTypes) => {
  const { cardsOnPile, pileIndex } = props;
  const distributeCards = (cardsOnPile: string[]) =>
    cardsOnPile.map((el, index) => {
      return cardsOnPile.length > 0 ? (
        <div id={`${pileIndex}`} className={styles[`pile__${index}`]}>
          <Card
            front={el}
            back={"acorns"}
            isTurnedBack={index !== cardsOnPile.length - 1}
            pileNumber={pileIndex}
          />
        </div>
      ) : (
        <div id={`${pileIndex}`} className={styles[`pile__${index}`]}></div>
      );
    });

  return (
    <div className={styles.pile__container}>{distributeCards(cardsOnPile)}</div>
  );
};

export default Pile;
