import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cardActions";
import { Card } from "..";
import { foundationConfig } from "../../configs/foundationConfig";
import styles from "./CardStock.module.scss";

type propTypes = {
  cardsOnStock: string[];
  cardsFromStock: string[];
  takeOneFromStock: any;
  reverseStock: any;
  removeCardMovedToFoundation: any;
  addCardToFirstFoundation: any;
  addCardToSecondFoundation: any;
  addCardToThirdFoundation: any;
  addCardToFourthFoundation: any;
  cardsOnFoundations: any;
};

const CardStock: React.FC<propTypes> = (props: propTypes) => {
  const {
    cardsOnStock,
    cardsFromStock,
    takeOneFromStock,
    reverseStock,
    removeCardMovedToFoundation,
    addCardToFirstFoundation,
    addCardToSecondFoundation,
    addCardToThirdFoundation,
    addCardToFourthFoundation,
    cardsOnFoundations,
  } = props;

  const moveFirstFromTheTop = () => {
    if (cardsOnStock.length) {
      const cardToPush: any = cardsOnStock.pop();
      takeOneFromStock(cardToPush);
    } else {
      reverseStock(cardsFromStock.reverse());
    }
  };

  const moveToFoundation = (e: any) => {
    const card = e.target.dataset.cardname;
    if (card.match("ace")) {
      let foundationToPopulate: string[] = [];
      Object.keys(cardsOnFoundations).forEach((foundation) => {
        if (!cardsOnFoundations[foundation].cards.length) {
          foundationToPopulate.push(foundation);
        }
      });
      if (!cardsOnFoundations[foundationToPopulate[0]].cards.length) {
        switch (foundationToPopulate[0]) {
          case "cardsOnFirstFoundation":
            addCardToFirstFoundation(card, e.target.dataset.color);
            break;
          case "cardsOnSecondFoundation":
            addCardToSecondFoundation(card, e.target.dataset.color);
            break;
          case "cardsOnThirdFoundation":
            addCardToThirdFoundation(card, e.target.dataset.color);
            break;
          case "cardsOnFourthFoundation":
            addCardToFourthFoundation(card, e.target.dataset.color);
            break;
        }
        removeCardMovedToFoundation(cardsFromStock.filter((el) => el !== card));
        foundationConfig[e.target.dataset.color].shift();
      }
    }

    if (!card.match("ace")) {
      Object.keys(cardsOnFoundations).forEach((foundation) => {
        if (
          cardsOnFoundations[foundation].foundationColor ===
            e.target.dataset.color &&
          foundationConfig[
            cardsOnFoundations[foundation].foundationColor
          ][0] === card
        ) {
          console.log(foundation);
          foundationConfig[e.target.dataset.color].shift();
          removeCardMovedToFoundation(
            cardsFromStock.filter((el) => el !== card)
          );
          switch (foundation) {
            case "cardsOnFirstFoundation":
              addCardToFirstFoundation(card);
              break;
            case "cardsOnSecondFoundation":
              addCardToSecondFoundation(card);
              break;
            case "cardsOnThirdFoundation":
              addCardToThirdFoundation(card);
              break;
            case "cardsOnFourthFoundation":
              addCardToFourthFoundation(card);
              break;
          }
        }
      });
    }
  };

  return (
    <>
      <div className={styles.cardStock} onClick={moveFirstFromTheTop}>
        <div className={styles.cardStock__cardHolder}>
          {cardsOnStock.length
            ? cardsOnStock.map((el) => (
                <Card front={el} back={"acorns"} isTurnedBack={true} />
              ))
            : null}
        </div>
      </div>
      <div className={styles.cardsOnTable}>
        {cardsFromStock.map((el) => (
          <Card
            front={el}
            back={"acorns"}
            isTurnedBack={false}
            onDoubleClick={moveToFoundation}
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
    addCardToFirstFoundation: (card: string, foundationColor: string) =>
      dispatch(actions.addCardToFirstFoundation(card, foundationColor)),
    addCardToSecondFoundation: (card: string, foundationColor: string) =>
      dispatch(actions.addCardToSecondFoundation(card, foundationColor)),
    addCardToThirdFoundation: (card: string, foundationColor: string) =>
      dispatch(actions.addCardToThirdFoundation(card, foundationColor)),
    addCardToFourthFoundation: (card: string, foundationColor: string) =>
      dispatch(actions.addCardToFourthFoundation(card, foundationColor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardStock);
