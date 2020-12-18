import React, { useRef } from "react";
import { connect } from "react-redux";
import { useCountDistanceBetweenPiles } from "./GameContainerHooks";
import * as actions from "../../store/actions/cardActions";
import { FoundationField, Pile, CardStock } from "../../components";
import { cardConfigType } from "../../configs/cardTypes";
import styles from "./GameContainer.module.scss";

type propTypes = {
  cardsOnFirstFoundation: cardConfigType[];
  cardsOnSecondFoundation: cardConfigType[];
  cardsOnThirdFoundation: cardConfigType[];
  cardsOnFourthFoundation: cardConfigType[];
  addCardToFoundation: any;
  cardsOnPiles: cardConfigType;
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

  const pilesContainer = useRef(null);

  const distanceBtwPiles = useCountDistanceBetweenPiles(pilesContainer);

  return (
    <div className={styles.gameUIBorder}>
      <div className={styles.gameContainer}>
        <div className={styles.gameContainer__top}>
          <div className={styles.gameContainer__cardStock}>
            <CardStock distanceBtwPiles={distanceBtwPiles} />
          </div>
          <div className={styles.gameContainer__foundation}>
            <div className={styles.gameContainer__foundationFiller}></div>
            <div className={styles.gameContainer__foundationFiller}></div>
            <div className={styles.gameContainer__foundationFiller}></div>
            {[
              cardsOnFirstFoundation,
              cardsOnSecondFoundation,
              cardsOnThirdFoundation,
              cardsOnFourthFoundation,
            ].map((cardsOnFondation, index) => (
              <FoundationField
                cardsOnStock={cardsOnFondation}
                foundationId={index}
                key={index}
              />
            ))}
          </div>
        </div>
        <div ref={pilesContainer} className={styles.gameContainer__piles}>
          {piles(cardsOnPiles)}
        </div>
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
      card: cardConfigType,
      foundationNumber: string,
      foundationSuite: string
    ) =>
      dispatch(
        actions.addCardToFoundation(card, foundationNumber, foundationSuite)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
