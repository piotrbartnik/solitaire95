import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cardActions";
import { FoundationField, Pile, CardStock } from "../../components";
import styles from "./GameContainer.module.scss";

type cardObject = {
  cardFront: string;
  isTurnedBack: boolean | undefined;
  cardColor: string;
  cardSuite: string;
  cardOrder: string;
};

type propTypes = {
  cardsOnFirstFoundation: string[];
  cardsOnSecondFoundation: string[];
  cardsOnThirdFoundation: string[];
  cardsOnFourthFoundation: string[];
  addCardToFoundation: any;
  cardsOnPiles: object;
};

const GameContainer: React.FC<propTypes> = (props) => {
  const {
    cardsOnFirstFoundation,
    cardsOnSecondFoundation,
    cardsOnThirdFoundation,
    cardsOnFourthFoundation,
    cardsOnPiles,
  } = props;

  const piles = (config: any) =>
    Object.keys(config).map((el, index) => (
      <div className={styles.gameContainer__singlePile} key={index}>
        <Pile cardsOnPile={config[el]} pileIndex={index} />
      </div>
    ));

  return (
    <div className={styles.gameUIBorder}>
      <div className={styles.gameContainer}>
        <div className={styles.gameContainer__top}>
          <div className={styles.gameContainer__cardStock}>
            <CardStock />
          </div>
          <div className={styles.gameContainer__foundation}>
            <FoundationField cardsOnStock={cardsOnFirstFoundation} />
            <FoundationField cardsOnStock={cardsOnSecondFoundation} />
            <FoundationField cardsOnStock={cardsOnThirdFoundation} />
            <FoundationField cardsOnStock={cardsOnFourthFoundation} />
          </div>
        </div>
        <div className={styles.gameContainer__piles}>{piles(cardsOnPiles)}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cardsOnFirstFoundation:
      state.cardsOnFoundation.cardsOnFirstFoundation.cards,
    cardsOnSecondFoundation:
      state.cardsOnFoundation.cardsOnSecondFoundation.cards,
    cardsOnThirdFoundation:
      state.cardsOnFoundation.cardsOnThirdFoundation.cards,
    cardsOnFourthFoundation:
      state.cardsOnFoundation.cardsOnFourthFoundation.cards,
    cardsOnPiles: state.cardDistribution.cardsOnPiles,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCardToFoundation: (
      card: cardObject,
      foundationNumber: string,
      foundationSuite: string
    ) =>
      dispatch(
        actions.addCardToFoundation(card, foundationNumber, foundationSuite)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
