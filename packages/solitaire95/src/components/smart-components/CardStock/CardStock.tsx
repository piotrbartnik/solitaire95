import React, { useContext } from "react";
import { connect } from "react-redux";
import { CardBackContext } from "../../game-containers";
import * as cardActions from "../../../store/actions/cardActions";
import * as scoreActions from "../../../store/actions/scoreActions";
import * as gameActions from "../../../store/actions/gameActions";
import { CardsDistributionInitialState } from "../../../store/reducers/cardsDistributionReducer";
import { Card } from "..";
import { cardConfigType } from "../../../configs/cardTypes";
import { moveToFoundation } from "../../../helpers/cardMoving";
import styles from "./CardStock.module.scss";

export type CardStockStateTypes = {
  cardsOnStock?: cardConfigType[];
  cardsFromStock?: cardConfigType[];
  cardsOnFoundations?: cardConfigType[];
};
export type CardStockDispatchTypes = {
  takeOneFromStock: (cardToPush: cardConfigType) => void;
  reverseStock: (cardsFromStock: cardConfigType[]) => void;
  removeCardMovedToFoundation: (card: cardConfigType[]) => void;
  addCardToFoundation: (
    card: cardConfigType,
    foundationNumber: string,
    foundationSuite: string
  ) => void;
  addPoints: (points: number) => void;
  startGame: () => void;
};

export type CardStockPropTypes = {
  distanceBtwPiles?: number;
};

const CardStock: React.FC<
  CardStockPropTypes & CardStockStateTypes & CardStockDispatchTypes
> = (props) => {
  const {
    cardsOnStock,
    cardsFromStock,
    takeOneFromStock,
    reverseStock,
    removeCardMovedToFoundation,
    cardsOnFoundations,
    addCardToFoundation,
    distanceBtwPiles,
    addPoints,
    startGame,
  } = props;

  const moveFirstFromTheTop = () => {
    if (cardsOnStock?.length) {
      const cardToPush = cardsOnStock.pop();
      takeOneFromStock(cardToPush as cardConfigType);
      startGame();
    } else {
      reverseStock((cardsFromStock as cardConfigType[]).reverse());
    }
  };

  const { cardBackImage } = useContext(CardBackContext);

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
                  className={[styles.card, styles[`card_${index}`]].join(" ")}
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
        {cardsFromStock?.map((card, index) => (
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
              onDoubleClick={(
                e: React.MouseEvent<HTMLDivElement, MouseEvent>
              ) =>
                moveToFoundation(
                  e,
                  cardsOnFoundations as cardConfigType[],
                  addCardToFoundation,
                  removeCardMovedToFoundation,
                  false,
                  addPoints,
                  cardsFromStock
                )
              }
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
  cardsOnFoundation: any;
}) => {
  return {
    cardsOnStock: state.cardDistribution.cardsOnStock,
    cardsFromStock: state.cardDistribution.cardsFromStock,
    cardsOnFoundations: state.cardsOnFoundation,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    takeOneFromStock: (payload: cardConfigType) =>
      dispatch(cardActions.takeOneFromStock(payload)),
    reverseStock: (payload: cardConfigType[]) =>
      dispatch(cardActions.reverseStock(payload)),
    removeCardMovedToFoundation: (payload: cardConfigType[]) =>
      dispatch(cardActions.removeCardMovedToFoundation(payload)),
    addCardToFoundation: (
      card: cardConfigType,
      foundationNumber: string,
      foundationSuite: string
    ) =>
      dispatch(
        cardActions.addCardToFoundation(card, foundationNumber, foundationSuite)
      ),
    addPoints: (payload: number) => dispatch(scoreActions.countScore(payload)),
    startGame: () => dispatch(gameActions.startGame()),
  };
};

export default connect<
  CardStockStateTypes,
  CardStockDispatchTypes,
  CardStockPropTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(CardStock);
