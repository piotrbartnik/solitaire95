import React, { useContext } from "react";
import { connect } from "react-redux";
import { CardBackContext } from "../../game-containers";
import * as cardActions from "../../../store/actions/cardActions";
import * as scoreActions from "../../../store/actions/scoreActions";
import * as gameActions from "../../../store/actions/gameActions";
import { Card } from "..";
import { cardConfigType } from "../../../configs/cardTypes";
import { moveToFoundation } from "../../../helpers/cardMoving";
import styles from "./CardStock.module.scss";

type cardStockPropTypes = {
  cardsOnStock: cardConfigType[];
  cardsFromStock: cardConfigType[];
  takeOneFromStock: (cardToPush: cardConfigType) => void;
  reverseStock: (cardsFromStock: cardConfigType[]) => void;
  removeCardMovedToFoundation: (card: cardConfigType) => void;
  cardsOnFoundations: cardConfigType[];
  addCardToFoundation: (
    card: cardConfigType,
    foundationNumber: string,
    foundationSuite: string
  ) => void;
  distanceBtwPiles: number;
  addPoints: (points: number) => void;
  startGame: () => void;
};

const CardStock: React.FC<cardStockPropTypes> = (props) => {
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
    if (cardsOnStock.length) {
      const cardToPush = cardsOnStock.pop() as cardConfigType;
      takeOneFromStock(cardToPush);
      startGame();
    } else {
      reverseStock(cardsFromStock.reverse());
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
          {cardsOnStock.length
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
        {cardsFromStock.map((card, index) => (
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
                  cardsOnFoundations,
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

const mapStateToProps = (state: any) => {
  return {
    cardsOnStock: state.cardDistribution.cardsOnStock,
    cardsFromStock: state.cardDistribution.cardsFromStock,
    cardsOnFoundations: state.cardsOnFoundation,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    takeOneFromStock: (payload: cardConfigType) =>
      dispatch(cardActions.takeOneFromStock(payload)),
    reverseStock: (payload: cardConfigType[]) =>
      dispatch(cardActions.reverseStock(payload)),
    removeCardMovedToFoundation: (payload: cardConfigType) =>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardStock);
