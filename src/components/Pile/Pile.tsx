import React from "react";
import { Card } from "..";
import styles from "./Pile.module.scss";

type propTypes = {
  cardsOnPile: string[];
};

const Pile: React.FC<propTypes> = (props: propTypes) => {
  const { cardsOnPile } = props;

  const distributeCards = (cardsOnPile: string[]) =>
    cardsOnPile.map((el, index) => (
      <div className={styles[`pile__${index}`]}>
        <Card front={el} back={"acorns"} isTurnedBack={false} />
      </div>
    ));

  console.log(distributeCards(cardsOnPile));
  return (
    <div className={styles.pile__container}>{distributeCards(cardsOnPile)}</div>
  );
};

export default Pile;
