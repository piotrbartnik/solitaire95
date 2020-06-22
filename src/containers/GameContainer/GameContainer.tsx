import React from "react";
import { CardDestination } from "../../UI";
import styles from "./GameContainer.module.scss";

const GameContainer: React.FC = () => {
  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameContainer__cardDestination}>
        <CardDestination />
        <CardDestination />
        <CardDestination />
        <CardDestination />
      </div>
    </div>
  );
};

export default GameContainer;
