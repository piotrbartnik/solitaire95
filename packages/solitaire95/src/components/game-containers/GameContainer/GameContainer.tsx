import React, { useRef, MutableRefObject } from "react";
import { connect } from "react-redux";
import {
  FoundationInitialState,
  CardsDistributionInitialState,
} from "../../../store/reducers/";
import { useCountDistanceBetweenPiles } from "./GameContainerHooks";
import { addCardToFoundation } from "../../../store/actions/";
import { Foundation, Pile, CardStock } from "../../smart-components";
import { cardConfigType } from "../../../configs/cardTypes";
import styles from "./GameContainer.module.scss";

type GameContainerStateTypes = {
  cardsOnFirstFoundation: cardConfigType[];
  cardsOnSecondFoundation: cardConfigType[];
  cardsOnThirdFoundation: cardConfigType[];
  cardsOnFourthFoundation: cardConfigType[];
  cardsOnPiles: { [key: string]: cardConfigType[] };
  cardsOnFoundations: FoundationInitialState;
};

type GameContainerDispatchTypes = {
  addCardToFoundation: (
    card: cardConfigType,
    foundationNumber: string,
    foundationSuite: string
  ) => void;
};

const GameContainerInternal: React.FC<
  GameContainerStateTypes & GameContainerDispatchTypes
> = (props) => {
  const {
    cardsOnFirstFoundation,
    cardsOnSecondFoundation,
    cardsOnThirdFoundation,
    cardsOnFourthFoundation,
    cardsOnPiles,
  } = props;

  const piles = (config: { [key: string]: cardConfigType[] }) =>
    Object.keys(config).map((el, index) => (
      <div className={styles.gameContainer__singlePile} key={index}>
        <Pile cardsOnPile={config[el]} pileIndex={index} />
      </div>
    ));

  const pilesContainer = useRef(null);

  const distanceBtwPiles = useCountDistanceBetweenPiles(
    pilesContainer as MutableRefObject<null>
  );

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
              <Foundation
                cardsOnFoundation={cardsOnFondation}
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

const mapStateToProps = (state: {
  cardsOnFoundation: FoundationInitialState;
  cardDistribution: CardsDistributionInitialState;
}) => {
  return {
    cardsOnFirstFoundation:
      state.cardsOnFoundation.cardsOnFirstFoundation.cards,
    cardsOnSecondFoundation:
      state.cardsOnFoundation.cardsOnSecondFoundation.cards,
    cardsOnThirdFoundation:
      state.cardsOnFoundation.cardsOnThirdFoundation.cards,
    cardsOnFourthFoundation:
      state.cardsOnFoundation.cardsOnFourthFoundation.cards,
    cardsOnFoundations: state.cardsOnFoundation,
    cardsOnPiles: state.cardDistribution.cardsOnPiles,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    addCardToFoundation: (
      card: cardConfigType,
      foundationNumber: string,
      foundationSuite: string
    ) => dispatch(addCardToFoundation(card, foundationNumber, foundationSuite)),
  };
};

export const GameContainer = connect<
  GameContainerStateTypes,
  GameContainerDispatchTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(GameContainerInternal);
