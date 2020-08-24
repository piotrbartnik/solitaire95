import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cardActions";
import { useDrop } from "react-dnd";
import { itemTypes } from "../../configs/dragndropConfig";
import { FoundationField, Pile, CardStock } from "../../components";
import styles from "./GameContainer.module.scss";

type propTypes = {
  cardsOnFirstFoundation: string[];
  cardsOnSecondFoundation: string[];
  cardsOnThirdFoundation: string[];
  cardsOnFourthFoundation: string[];
  addCardToFoundation: any;
  cardsOnPiles: object;
  removeCardFromPile: any;
};

const GameContainer: React.FC<propTypes> = (props) => {
  const {
    cardsOnFirstFoundation,
    cardsOnSecondFoundation,
    cardsOnThirdFoundation,
    cardsOnFourthFoundation,
    addCardToFoundation,
    cardsOnPiles,
    // removeCardFromPile,
  } = props;

  const dropCardOnFoundation = (dragObject: any) => {
    const { front, cardSuite } = dragObject;
    addCardToFoundation(front, "cardsOnFirstFoundation", cardSuite);
    // removeCardFromPile();
  };

  const [, drop] = useDrop({
    accept: itemTypes.CARD,
    drop: (monitor) => {
      dropCardOnFoundation(monitor);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const piles = (config: any) =>
    Object.keys(config).map((el) => (
      <div className={styles.gameContainer__singlePile}>
        <Pile cardsOnPile={config[el]} />
      </div>
    ));

  return (
    <div className={styles.gameUIBorder}>
      <div className={styles.gameContainer}>
        <div className={styles.gameContainer__top}>
          <div className={styles.gameContainer__cardStock}>
            <CardStock />
          </div>
          <div className={styles.gameContainer__foundation} ref={drop}>
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
      card: string,
      foundationNumber: string,
      foundationSuite: string
    ) =>
      dispatch(
        actions.addCardToFoundation(card, foundationNumber, foundationSuite)
      ),
    removeCardFromPile: () => dispatch(actions.removeCardFromPile()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
