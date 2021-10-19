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
  takeThreeFromStock,
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
import { useGetThreeFromCardsOnStock } from "./CardStock.hooks";

export type CardStockStateTypes = {
  cardsOnStock: cardConfigType[];
  cardsFromStock: cardConfigType[];
  cardsOnFoundations: FoundationInitialState;
  stockCounter: StockCount;
  gameStarted: boolean;
  drawType: string;
  threeCardsOnTable: cardConfigType[];
};

export type CardStockDispatchTypes = {
  takeOneFromStock: (
    cardsOnStock: cardConfigType[],
    cardToAddToTable: cardConfigType
  ) => void;
  takeThreeFromStock: (
    cardsOnStock: cardConfigType[],
    cardToAddToTable: cardConfigType[],
    threeCardsOnTable: cardConfigType[]
  ) => void;
  reverseStock: (cardsFromStock: cardConfigType[]) => void;
  removeCardFromStock: (
    filteredCardsOnStock: cardConfigType[],
    threeCardsOnStockFiltered: cardConfigType[]
  ) => void;
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
    takeThreeFromStock,
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
    threeCardsOnTable,
  } = props;

  const moveFirstFromTheTop = () => {
    if (cardsOnStock?.length) {
      const cardsOnStockCopy = cardsOnStock.slice();
      const cardToPush = cardsOnStockCopy.pop();

      takeOneFromStock(cardsOnStockCopy, cardToPush as cardConfigType);
      !gameStarted && startGame();
    } else {
      addToStockCounter();

      const reversedStock = cardsFromStock.reverse();
      reverseStock(reversedStock);
      if (stockCounter.stockRevolutions >= 1) {
        addPoints(-100);
      }
    }
  };

  const moveThreeFromTheTop = () => {
    if (cardsOnStock?.length) {
      const cardsOnStockCopy =
        cardsOnStock.length >= 3
          ? cardsOnStock.slice(0, cardsOnStock.length - 3)
          : [];
      const amountOfCardsToBePushedToTable =
        cardsOnStock.length > 3 ? cardsOnStock.length - 3 : 0;
      const cardToPush = cardsOnStock.slice(amountOfCardsToBePushedToTable);

      takeThreeFromStock(
        cardsOnStockCopy,
        cardToPush as cardConfigType[],
        cardToPush
      );
      !gameStarted && startGame();
    } else {
      addToStockCounter();
      const reversedThreeCards = [];
      for (let i = 0; i < cardsFromStock.length; i += 3) {
        reversedThreeCards.unshift(...cardsFromStock.slice(i, i + 3));
      }
      reverseStock(reversedThreeCards);
      if (stockCounter.stockRevolutions >= 3) {
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
        cardsFromStock,
        undefined,
        undefined,
        threeCardsOnTable
      ),
    [
      addCardToFoundation,
      addPoints,
      cardsFromStock,
      cardsOnFoundations,
      removeCardFromStock,
      threeCardsOnTable,
    ]
  );

  useGetThreeFromCardsOnStock(
    threeCardsOnTable,
    cardsFromStock,
    takeThreeFromStock,
    cardsOnStock
  );

  let threeCardRightShift = 0;

  if (cardsFromStock.length > 9 && cardsFromStock.length <= 18) {
    threeCardRightShift = 4;
  } else if (cardsFromStock.length > 18) {
    threeCardRightShift = 8;
  } else {
    threeCardRightShift = 0;
  }

  const threeCardsOnCardStock = () => {
    return cardsFromStock.length ? (
      <>
        <div className={styles.threeCardShifter}></div>
        <div
          className={styles.threeCardShifter}
          style={{
            left: "4px",
            top: "2px",
            position: "absolute",
            display: cardsFromStock.length > 18 ? "block" : "none",
          }}
        ></div>
        {threeCardsOnTable?.reverse().map((card, index) => (
          <div
            className={[styles.card, styles[`card_${index}`]].join(" ")}
            id={`${index}`}
            key={`${index}${card}cardsOnTable`}
            style={{
              left: `${27 * index + threeCardRightShift}px`,
              top: `${0 + threeCardRightShift / 2}px`,
            }}
          >
            <Card
              cardFront={card[0]}
              cardSuite={card[1]}
              cardColor={card[3]}
              cardOrder={card[4]}
              cardBack={cardBackImage}
              isTurnedBack={false}
              onDoubleClick={
                index === threeCardsOnTable.length - 1
                  ? moveToFoundationCallback
                  : undefined
              }
              key={`${index}${card}`}
              canBeDragged={index === threeCardsOnTable.length - 1}
            />
          </div>
        ))}
      </>
    ) : null;
  };

  return (
    <div className={styles.cardStock__container}>
      <div
        className={styles.cardStock}
        onClick={
          drawType === "drawOne" ? moveFirstFromTheTop : moveThreeFromTheTop
        }
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
          : threeCardsOnCardStock()}
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
    threeCardsOnTable: state.cardDistribution.threeCardsOnTable,
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
    takeThreeFromStock: (
      cardsOnStock: cardConfigType[],
      cardToAddToTable: cardConfigType[],
      threeCardsOnTable: cardConfigType[]
    ) =>
      dispatch(
        takeThreeFromStock(cardsOnStock, cardToAddToTable, threeCardsOnTable)
      ),
    reverseStock: (payload: cardConfigType[]) =>
      dispatch(reverseStock(payload)),
    removeCardFromStock: (
      filteredCardsOnStock: cardConfigType[],
      threeCardsOnStockFiltered: cardConfigType[]
    ) =>
      dispatch(
        removeCardFromStock(filteredCardsOnStock, threeCardsOnStockFiltered)
      ),
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
