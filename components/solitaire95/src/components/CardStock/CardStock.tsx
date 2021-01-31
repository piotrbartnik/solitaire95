import React, { useContext } from "react";
import { connect } from "react-redux";
import { CardBackContext } from "../../containers/";
import * as cardActions from "../../store/actions/cardActions";
import * as scoreActions from "../../store/actions/scoreActions";
import { Card } from "..";
import { cardConfigType } from "../../configs/cardTypes";
import styles from "./CardStock.module.scss";
import { moveToFoundation } from "../../helpers/cardMoving";

type propTypes = {
  cardsOnStock: cardConfigType[];
  cardsFromStock: cardConfigType[];
  takeOneFromStock: any;
  reverseStock: any;
  removeCardMovedToFoundation: any;
  cardsOnFoundations: any;
  addCardToFoundation: any;
  distanceBtwPiles: number;
  addPoints: any;
};

const CardStock: React.FC<propTypes> = (props: propTypes) => {
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
  } = props;

  const moveFirstFromTheTop = () => {
    if (cardsOnStock.length) {
      const cardToPush: any = cardsOnStock.pop();
      takeOneFromStock(cardToPush);
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
    takeOneFromStock: (payload: string) =>
      dispatch(cardActions.takeOneFromStock(payload)),
    reverseStock: (payload: string[]) =>
      dispatch(cardActions.reverseStock(payload)),
    removeCardMovedToFoundation: (payload: string[]) => {
      dispatch(cardActions.removeCardMovedToFoundation(payload));
    },
    addCardToFoundation: (
      card: cardConfigType,
      foundationNumber: string,
      foundationSuite: string
    ) => {
      dispatch(
        cardActions.addCardToFoundation(card, foundationNumber, foundationSuite)
      );
    },
    addPoints: (payload: number) => {
      dispatch(scoreActions.countScore(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardStock);
