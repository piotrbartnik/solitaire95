import React from "react";
import { connect } from "react-redux";
import { FoundationField, Card, CardStock } from "../../components";
import styles from "./GameContainer.module.scss";

type propTypes = {
  cardsOnFirstFoundation: string[];
};

const GameContainer: React.FC<propTypes> = (props) => {
  const { cardsOnFirstFoundation } = props;

  return (
    <div className={styles.gameUIBorder}>
      <div className={styles.gameContainer}>
        <div className={styles.gameContainer__top}>
          <div className={styles.gameContainer__cardStock}>
            <CardStock />
          </div>
          <div className={styles.gameContainer__foundation}>
            <FoundationField cardsOnStock={cardsOnFirstFoundation} />
            <FoundationField />
            <FoundationField />
            <FoundationField />
          </div>
        </div>
        <div className={styles.gameContainer__foundation}>
          <Card front={"kingOfHearts"} back={"acorns"} isTurnedBack={false} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cardsOnFirstFoundation: state.cardsOnFirstFoundation.cardsOnFirstFoundation,
  };
};

export default connect(mapStateToProps)(GameContainer);
