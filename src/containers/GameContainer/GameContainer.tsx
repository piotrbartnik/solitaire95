import React from "react";
import { CardDestination, Card, CardPile } from "../../components";
import styles from "./GameContainer.module.scss";

const GameContainer: React.FC = () => {
  return (
    <div className={styles.gameUIBorder}>
      <div className={styles.gameContainer}>
        <div className={styles.gameContainer__top}>
          <div className={styles.gameContainer__cardPile}>
            <CardPile />
          </div>
          <div className={styles.gameContainer__cardDestination}>
            <CardDestination />
            <CardDestination />
            <CardDestination />
            <CardDestination />
          </div>
        </div>
        <div className={styles.gameContainer__cardDestination}>
          <Card front={"kingOfHearts"} back={"acorns"} isTurnedBack={false} />
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
