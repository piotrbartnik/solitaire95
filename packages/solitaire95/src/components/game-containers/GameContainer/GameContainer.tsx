import React, { useRef, MutableRefObject, useMemo } from "react";
import { connect } from "react-redux";
import {
  FoundationInitialState,
  CardsDistributionInitialState,
  GameState,
} from "../../../store/reducers/";
import { WaterfallCanvas } from "../../ui-components";
import { useCountDistanceBetweenPiles } from "./GameContainerHooks";
import { addCardToFoundation } from "../../../store/actions/";
import { Foundation, Pile, CardStock } from "../../smart-components";
import { cardConfigType } from "../../../configs/cardTypes";
import styles from "./GameContainer.module.scss";

type GameContainerPropTypes = {
  canvasWidth?: number;
  canvasHeight?: number;
};

type GameContainerStateTypes = {
  cardsOnFirstFoundation: cardConfigType[];
  cardsOnSecondFoundation: cardConfigType[];
  cardsOnThirdFoundation: cardConfigType[];
  cardsOnFourthFoundation: cardConfigType[];
  cardsOnPiles: { [key: string]: cardConfigType[] };
  cardsOnFoundations: FoundationInitialState;
  gameFinished: boolean;
};

type GameContainerDispatchTypes = {
  addCardToFoundation: (
    card: cardConfigType,
    foundationNumber: string,
    foundationSuite: string
  ) => void;
};

const GameContainerInternal: React.FC<
  GameContainerStateTypes & GameContainerDispatchTypes & GameContainerPropTypes
> = (props) => {
  const {
    cardsOnFirstFoundation,
    cardsOnSecondFoundation,
    cardsOnThirdFoundation,
    cardsOnFourthFoundation,
    cardsOnPiles,
    gameFinished,
    canvasWidth,
    canvasHeight,
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

  const foundationCountaierRef = useRef<HTMLDivElement>(null);

  const renderFoundations = useMemo(() => {
    return [
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
    ));
  }, [
    cardsOnFirstFoundation,
    cardsOnSecondFoundation,
    cardsOnThirdFoundation,
    cardsOnFourthFoundation,
  ]);

  const foundationsSuiteOrder: [string, number][] = gameFinished
    ? [
        [
          cardsOnFirstFoundation[0][1],
          (
            foundationCountaierRef.current?.querySelector(
              "div[id='0']"
            ) as Element
          )?.getBoundingClientRect().left,
        ],
        [
          cardsOnSecondFoundation[0][1],
          (
            foundationCountaierRef.current?.querySelector(
              "div[id='1']"
            ) as Element
          )?.getBoundingClientRect().left,
        ],
        [
          cardsOnThirdFoundation[0][1],
          (
            foundationCountaierRef.current?.querySelector(
              "div[id='2']"
            ) as Element
          )?.getBoundingClientRect().left,
        ],
        [
          cardsOnFourthFoundation[0][1],
          (
            foundationCountaierRef.current?.querySelector(
              "div[id='3']"
            ) as Element
          )?.getBoundingClientRect().left,
        ],
      ]
    : [];

  return (
    <div className={styles.gameUIBorder}>
      <div className={styles.gameContainer} id="gameContainer">
        {gameFinished ? (
          <WaterfallCanvas
            canvasWidth={canvasWidth as number}
            canvasHeight={canvasHeight as number}
            foundationsOrder={foundationsSuiteOrder}
          />
        ) : (
          <>
            <div className={styles.gameContainer__top}>
              <div className={styles.gameContainer__cardStock}>
                <CardStock distanceBtwPiles={distanceBtwPiles} />
              </div>
              <div
                className={styles.gameContainer__foundation}
                ref={foundationCountaierRef}
              >
                <div className={styles.gameContainer__foundationFiller}></div>
                <div className={styles.gameContainer__foundationFiller}></div>
                <div className={styles.gameContainer__foundationFiller}></div>
                {renderFoundations}
              </div>
            </div>
            <div ref={pilesContainer} className={styles.gameContainer__piles}>
              {piles(cardsOnPiles)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: {
  cardsOnFoundation: FoundationInitialState;
  cardDistribution: CardsDistributionInitialState;
  gameState: GameState;
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
    gameFinished: state.gameState.gameFinished,
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
  GameContainerDispatchTypes,
  GameContainerPropTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(GameContainerInternal);
