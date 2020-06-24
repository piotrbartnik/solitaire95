import React from "react";
import { CardDestination } from "../../components";
import { Card } from "../../components";
import styles from "./GameContainer.module.scss";

const GameContainer: React.FC = () => {
  return (
    <div className={styles.gameUIBorder}>
      <div className={styles.gameContainer}>
        <div className={styles.gameContainer__cardDestination}>
          <CardDestination />
          <CardDestination />
          <CardDestination />
          <CardDestination />
        </div>
        <div className={styles.gameContainer__cardDestination}>
          <Card />
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
