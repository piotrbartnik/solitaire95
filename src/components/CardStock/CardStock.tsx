import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cardActions";
import { Card } from "..";
import { foundationConfig } from "../../configs/foundationConfig";
import styles from "./CardStock.module.scss";
import { moveToFoundation } from "../../helpers/cardMoving";

type propTypes = {
  cardsOnStock: string[];
  cardsFromStock: string[];
  takeOneFromStock: any;
  reverseStock: any;
  removeCardMovedToFoundation: any;
  cardsOnFoundations: any;
  addCardToFoundation: any;
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
  } = props;

  const moveFirstFromTheTop = () => {
    if (cardsOnStock.length) {
      const cardToPush: any = cardsOnStock.pop();
      takeOneFromStock(cardToPush);
    } else {
      reverseStock(cardsFromStock.reverse());
    }
  };

  return (
    <>
      <div className={styles.cardStock} onClick={moveFirstFromTheTop}>
        <div className={styles.cardStock__cardHolder}>
          {cardsOnStock.length
            ? cardsOnStock.map((card, index) => (
                <Card
                  front={`${card[0]}_${card[1]}`}
                  cardSuite={card[1]}
                  cardColor={card[3]}
                  cardOrder={card[4]}
                  back={"acorns"}
                  isTurnedBack={true}
                  key={`${index}${card}`}
                />
              ))
            : null}
        </div>
      </div>
      <div className={styles.cardsOnTable}>
        {cardsFromStock.map((card, index) => (
          <Card
            front={`${card[0]}_${card[1]}`}
            cardSuite={card[1]}
            cardColor={card[3]}
            cardOrder={card[4]}
            back={"acorns"}
            isTurnedBack={false}
            onDoubleClick={(e: any) =>
              moveToFoundation(
                e,
                cardsOnFoundations,
                foundationConfig,
                addCardToFoundation,
                removeCardMovedToFoundation,
                false,
                cardsFromStock
              )
            }
            key={`${index}${card}`}
          />
        ))}
      </div>
    </>
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
      dispatch(actions.takeOneFromStock(payload)),
    reverseStock: (payload: string[]) =>
      dispatch(actions.reverseStock(payload)),
    removeCardMovedToFoundation: (payload: string[]) => {
      dispatch(actions.removeCardMovedToFoundation(payload));
    },
    addCardToFoundation: (
      card: string,
      foundationNumber: string,
      foundationSuite: string
    ) =>
      dispatch(
        actions.addCardToFoundation(card, foundationNumber, foundationSuite)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardStock);
