import React, { useContext, useCallback } from "react";
import { connect } from "react-redux";
import { CardBackContext } from "../../game-containers";
import {
  takeOneFromStock,
  reverseStock,
  removeCardFromStock,
  addCardToFoundation,
  countScore,
  startGame,
  stockTurnCounter,
} from "../../../store/actions";
import {
  CardsDistributionInitialState,
  FoundationInitialState,
  StockCount,
  GameState,
} from "../../../store/reducers/";
import { Card } from "..";
import { cardConfigType } from "../../../configs/cardTypes";
import { moveToFoundation } from "../../../helpers/cardMoving";
import styles from "./CardStock.module.scss";

export type CardStockStateTypes = {
  cardsOnStock: cardConfigType[];
  cardsFromStock: cardConfigType[];
  cardsOnFoundations: FoundationInitialState;
  stockCounter: StockCount;
  gameStarted: boolean;
  drawType: string;
};

export type CardStockDispatchTypes = {
  takeOneFromStock: (
    cardsOnStock: cardConfigType[],
    cardToAddToTable: cardConfigType
  ) => void;
  reverseStock: (cardsFromStock: cardConfigType[]) => void;
  removeCardFromStock: (card: cardConfigType[]) => void;
  addCardToFoundation: (
    card: cardConfigType,
    foundationNumber: string,
    foundationSuite: string
  ) => void;
  addPoints: (points: number) => void;
  startGame: () => void;
  addToStockCounter: () => void;
};

export type CardStockPropTypes = {
  distanceBtwPiles?: number;
};

const CardStockInternal: React.FC<
  CardStockPropTypes & CardStockStateTypes & CardStockDispatchTypes
> = (props) => {
  const {
    cardsOnStock,
    cardsFromStock,
    takeOneFromStock,
    reverseStock,
    removeCardFromStock,
    cardsOnFoundations,
    addCardToFoundation,
    distanceBtwPiles,
    addPoints,
    startGame,
    addToStockCounter,
    stockCounter,
    gameStarted,
    drawType,
  } = props;

  const moveFirstFromTheTop = () => {
    if (cardsOnStock?.length) {
      const cardsOnStockCopy =
        drawType === "drawOne"
          ? cardsOnStock.slice()
          : cardsOnStock.slice(0, cardsOnStock.length - 3);
      const cardToPush =
        drawType === "drawOne"
          ? cardsOnStockCopy.pop()
          : cardsOnStock.slice(cardsOnStock.length - 3);

      takeOneFromStock(cardsOnStockCopy, cardToPush as cardConfigType);
      !gameStarted && startGame();
    } else {
      addToStockCounter();
      reverseStock(cardsFromStock.reverse());
      if (stockCounter.stockRevolutions >= 1) {
        addPoints(-100);
      }
    }
  };

  const { cardBackImage } = useContext(CardBackContext);

  const moveToFoundationCallback = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
      moveToFoundation(
        e,
        cardsOnFoundations,
        addCardToFoundation,
        removeCardFromStock,
        false,
        addPoints,
        cardsFromStock
      ),
    [
      addCardToFoundation,
      addPoints,
      cardsFromStock,
      cardsOnFoundations,
      removeCardFromStock,
    ]
  );

  return (
    <div className={styles.cardStock__container}>
      <div
        className={styles.cardStock}
        onClick={moveFirstFromTheTop}
        style={{ marginRight: `${distanceBtwPiles}px` }}
      >
        <div className={styles.cardStock__cardHolder}>
          {cardsOnStock?.length
            ? cardsOnStock.map((card, index) => (
                <div
                  className={[
                    styles.cardContainer,
                    styles[`card_${index}`],
                  ].join(" ")}
                  id={`${index}`}
                  key={`${index}${card}cardsOnStock`}
                >
                  <Card
                    cardFront={card[0]}
                    cardSuite={card[1]}
                    cardColor={card[3]}
                    cardOrder={card[4]}
                    cardBack={cardBackImage}
                    isTurnedBack={true}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
      <div className={styles.cardsOnTable}>
        {drawType === "drawOne"
          ? cardsFromStock?.map((card, index) => (
              <div
                className={[styles.card, styles[`card_${index}`]].join(" ")}
                id={`${index}`}
                key={`${index}${card}cardsOnTable`}
              >
                <Card
                  cardFront={card[0]}
                  cardSuite={card[1]}
                  cardColor={card[3]}
                  cardOrder={card[4]}
                  cardBack={cardBackImage}
                  isTurnedBack={false}
                  onDoubleClick={moveToFoundationCallback}
                  key={`${index}${card}`}
                />
              </div>
            ))
          : cardsFromStock
              .slice(cardsFromStock.length - 3)
              .map((card, index) => (
                <div
                  className={[styles.card, styles[`card_${index}`]].join(" ")}
                  id={`${index}`}
                  key={`${index}${card}cardsOnTable`}
                  style={{ left: `${27 * index}px` }}
                >
                  <Card
                    cardFront={card[0]}
                    cardSuite={card[1]}
                    cardColor={card[3]}
                    cardOrder={card[4]}
                    cardBack={cardBackImage}
                    isTurnedBack={false}
                    onDoubleClick={moveToFoundationCallback}
                    key={`${index}${card}`}
                  />
                </div>
              ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: {
  cardDistribution: CardsDistributionInitialState;
  cardsOnFoundation: FoundationInitialState;
  stockCounter: StockCount;
  gameState: GameState;
}) => {
  return {
    cardsOnStock: state.cardDistribution.cardsOnStock,
    cardsFromStock: state.cardDistribution.cardsFromStock,
    cardsOnFoundations: state.cardsOnFoundation,
    stockCounter: state.stockCounter,
    gameStarted: state.gameState.gameStarted,
    drawType: state.gameState.drawType,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    takeOneFromStock: (
      cardsOnStock: cardConfigType[],
      cardToAddToTable: cardConfigType
    ) => dispatch(takeOneFromStock(cardsOnStock, cardToAddToTable)),
    reverseStock: (payload: cardConfigType[]) =>
      dispatch(reverseStock(payload)),
    removeCardFromStock: (payload: cardConfigType[]) =>
      dispatch(removeCardFromStock(payload)),
    addCardToFoundation: (
      card: cardConfigType,
      foundationNumber: string,
      foundationSuite: string
    ) => dispatch(addCardToFoundation(card, foundationNumber, foundationSuite)),
    addPoints: (payload: number) => dispatch(countScore(payload)),
    startGame: () => dispatch(startGame()),
    addToStockCounter: () => dispatch(stockTurnCounter()),
  };
};

export const CardStock = connect<
  CardStockStateTypes,
  CardStockDispatchTypes,
  CardStockPropTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(CardStockInternal);
