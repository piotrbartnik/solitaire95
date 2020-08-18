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
};

const GameContainer: React.FC<propTypes> = (props) => {
  const {
    cardsOnFirstFoundation,
    cardsOnSecondFoundation,
    cardsOnThirdFoundation,
    cardsOnFourthFoundation,
    addCardToFoundation,
  } = props;

  const dropTheKing = () =>
    addCardToFoundation("kingOfHearts", "cardsOnFirstFoundation", "hearts");

  const [, drop] = useDrop({
    accept: itemTypes.CARD,
    drop: () => dropTheKing(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const pilesConfig = {
    0: ["kingOfHearts"],
    // 1: ["kingOfHearts", "kingOfHearts"],
    // 2: ["kingOfHearts", "kingOfHearts", "kingOfHearts"],
    // 3: ["kingOfHearts", "kingOfHearts", "kingOfHearts", "kingOfHearts"],
    // 4: [
    //   "kingOfHearts",
    //   "kingOfHearts",
    //   "kingOfHearts",
    //   "kingOfHearts",
    //   "kingOfHearts",
    // ],
    // 5: [
    //   "kingOfHearts",
    //   "kingOfHearts",
    //   "kingOfHearts",
    //   "kingOfHearts",
    //   "kingOfHearts",
    //   "kingOfHearts",
    // ],
    // 6: [
    //   "kingOfHearts",
    //   "kingOfHearts",
    //   "kingOfHearts",
    //   "kingOfHearts",
    //   "kingOfHearts",
    //   "kingOfHearts",
    //   "kingOfHearts",
    // ],
  };

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
        <div className={styles.gameContainer__piles}>{piles(pilesConfig)}</div>
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
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCardToFoundation: (
      card: string,
      foundationNumber: string,
      foundationColor: string
    ) =>
      dispatch(
        actions.addCardToFoundation(card, foundationNumber, foundationColor)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
