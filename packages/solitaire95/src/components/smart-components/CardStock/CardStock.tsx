import React, { useCallback, useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  takeOneFromStock,
  reverseStock,
  removeCardFromStock,
  addCardToFoundation,
  countScore,
  startGame,
  stockTurnCounter,
  takeThreeFromStock,
  countVegasScore,
} from "../../../store/actions";
import {
  TakeOneFromStockType,
  TakeThreeFromStockType,
  ReverseStockType,
  RemoveCardFromStockType,
  AddCardToFoundationType,
  CountScoreType,
  StartGameType,
  StockTurnCounterType,
  CountVegasScoreType,
} from "../../../store/actions/actionTypes";
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
import { VegasContext } from "../../game-containers";

export type CardStockStateTypes = {
  cardsOnStock: cardConfigType[];
  cardsFromStock: cardConfigType[];
  cardsOnFoundations: FoundationInitialState;
  stockCounter: number;
  gameStarted: boolean;
  drawType: string;
  threeCardsOnTable: cardConfigType[];
  cardBackImage: string;
};

export type CardStockDispatchTypes = {
  takeOneFromStock: TakeOneFromStockType;
  takeThreeFromStock: TakeThreeFromStockType;
  reverseStock: ReverseStockType;
  removeCardFromStock: RemoveCardFromStockType;
  addCardToFoundation: AddCardToFoundationType;
  addPoints: CountScoreType;
  startGame: StartGameType;
  addToStockCounter: StockTurnCounterType;
  vegasDollarCounter: CountVegasScoreType;
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
    cardBackImage,
    vegasDollarCounter,
  } = props;

  const { isVegas } = useContext(VegasContext);

  const [blockVegasStock, setVegasBlockStock] = useState(false);

  const moveFirstFromTheTop = useCallback(() => {
    if (cardsOnStock?.length) {
      const cardsOnStockCopy = cardsOnStock.slice();
      const cardToPush = cardsOnStockCopy.pop();

      takeOneFromStock(cardsOnStockCopy, cardToPush as cardConfigType);
      !gameStarted && startGame();
    } else {
      addToStockCounter();

      const reversedStock = cardsFromStock.slice().reverse();
      reverseStock(reversedStock);
      if (stockCounter >= 1) {
        addPoints(-100);
      }
    }
  }, [
    addPoints,
    addToStockCounter,
    cardsFromStock,
    cardsOnStock,
    gameStarted,
    reverseStock,
    startGame,
    stockCounter,
    takeOneFromStock,
  ]);

  const moveThreeFromTheTop = useCallback(() => {
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
      if (stockCounter >= 3) {
        addPoints(-100);
      }
    }
  }, [
    addPoints,
    addToStockCounter,
    cardsFromStock,
    cardsOnStock,
    gameStarted,
    reverseStock,
    startGame,
    stockCounter,
    takeThreeFromStock,
  ]);

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
        threeCardsOnTable,
        isVegas,
        vegasDollarCounter
      ),
    [
      addCardToFoundation,
      addPoints,
      cardsFromStock,
      cardsOnFoundations,
      isVegas,
      removeCardFromStock,
      threeCardsOnTable,
      vegasDollarCounter,
    ]
  );

  useGetThreeFromCardsOnStock(
    threeCardsOnTable,
    cardsFromStock,
    takeThreeFromStock,
    cardsOnStock,
    drawType
  );

  let threeCardRightShift = 0;

  if (cardsFromStock.length > 9 && cardsFromStock.length <= 18) {
    threeCardRightShift = 4;
  } else if (cardsFromStock.length > 18) {
    threeCardRightShift = 8;
  } else {
    threeCardRightShift = 0;
  }

  const threeCardsArray = threeCardsOnTable?.slice().reverse();

  const threeCardsOnCardStock = cardsFromStock.length ? (
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
      {threeCardsArray?.map((card, index) => (
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
            canBeFocused={index === threeCardsOnTable.length - 1}
          />
        </div>
      ))}
    </>
  ) : null;

  useEffect(() => {
    if (drawType === "drawOne" && isVegas) {
      setVegasBlockStock(true);
      return;
    }
    if (drawType === "drawThree" && stockCounter >= 2 && isVegas) {
      setVegasBlockStock(true);
      return;
    }
    setVegasBlockStock(false);
  }, [drawType, stockCounter, isVegas]);

  const stockHolderBackground = blockVegasStock
    ? styles.vegasHolder
    : styles.circleHolder;

  const stockOnClickCallback = useCallback(() => {
    if (!cardsOnStock?.length && blockVegasStock) {
      return undefined;
    }
    if (drawType === "drawOne") {
      return moveFirstFromTheTop;
    }
    return moveThreeFromTheTop;
  }, [
    cardsOnStock?.length,
    blockVegasStock,
    drawType,
    moveThreeFromTheTop,
    moveFirstFromTheTop,
  ]);

  const handleButtonClick = ({ key }: { key: string }) => {
    if (key === "Enter") {
      if (!cardsOnStock?.length && blockVegasStock) {
        return undefined;
      }
      if (drawType === "drawOne") {
        return moveFirstFromTheTop();
      }
      return moveThreeFromTheTop();
    }
  };

  return (
    <div className={styles.cardStock__container}>
      <div
        className={styles.cardStock}
        onClick={stockOnClickCallback()}
        style={{ marginRight: `${distanceBtwPiles}px` }}
        onKeyPress={handleButtonClick}
        tabIndex={1}
      >
        <div className={styles.cardStock__cardHolder}>
          <div className={stockHolderBackground} />
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
                    canBeDragged={false}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
      <div className={styles.cardsOnTable} role="list" aria-label="card stock">
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
                  canBeFocused={index === cardsFromStock.length - 1}
                />
              </div>
            ))
          : threeCardsOnCardStock}
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
    stockCounter: state.stockCounter.stockRevolutions,
    gameStarted: state.gameState.gameStarted,
    drawType: state.gameState.drawType,
    cardBackImage: state.gameState.cardDeck,
  };
};

const mapDispatchToProps = {
  takeOneFromStock: takeOneFromStock,
  takeThreeFromStock: takeThreeFromStock,
  reverseStock: reverseStock,
  removeCardFromStock: removeCardFromStock,
  addCardToFoundation: addCardToFoundation,
  addPoints: countScore,
  startGame: startGame,
  addToStockCounter: stockTurnCounter,
  vegasDollarCounter: countVegasScore,
};

export const CardStock = connect<
  CardStockStateTypes,
  CardStockDispatchTypes,
  CardStockPropTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(CardStockInternal);
