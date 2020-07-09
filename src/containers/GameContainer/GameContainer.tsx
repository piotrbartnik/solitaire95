import React from "react";
import { connect } from "react-redux";
import { CardDestinationField, Card, CardPile } from "../../components";
import styles from "./GameContainer.module.scss";

type propTypes = {
  cardsOnFirstDestinationPile: string[];
};

const GameContainer: React.FC<propTypes> = (props) => {
  const { cardsOnFirstDestinationPile } = props;

  return (
    <div className={styles.gameUIBorder}>
      <div className={styles.gameContainer}>
        <div className={styles.gameContainer__top}>
          <div className={styles.gameContainer__cardPile}>
            <CardPile />
          </div>
          <div className={styles.gameContainer__cardDestination}>
            <CardDestinationField cardsOnPile={cardsOnFirstDestinationPile} />
            <CardDestinationField />
            <CardDestinationField />
            <CardDestinationField />
          </div>
        </div>
        <div className={styles.gameContainer__cardDestination}>
          <Card front={"kingOfHearts"} back={"acorns"} isTurnedBack={false} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cardsOnFirstDestinationPile:
      state.cardsOnFirstDestinationField.cardsOnFirstDesinationField,
  };
};

export default connect(mapStateToProps)(GameContainer);
