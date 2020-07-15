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
      Object.keys(foundationConfig).forEach((cardColor) => {
        let foundationToPopulate: string[] = [];
        Object.keys(cardsOnFoundations).forEach((foundation) => {
          if (!cardsOnFoundations[foundation].cards.length) {
            foundationToPopulate.push(foundation);
          }
        });

        if (!cardsOnFoundations[foundationToPopulate[0]].cards.length) {
          switch (foundationToPopulate[0]) {
            case "cardsOnFirstFoundation":
              addCardToFirstFoundation(cardColor, card);
              break;
            case "cardsOnSecondFoundation":
              addCardToSecondFoundation(cardColor, card);
              break;
            case "cardsOnThirdFoundation":
              addCardToThirdFoundation(cardColor, card);
              break;
            case "cardsOnFourthFoundation":
              addCardToFourthFoundation(cardColor, card);
              break;
          }
          removeCardMovedToFoundation(
            cardsFromStock.filter((el) => el !== card)
          );
          foundationConfig[cardColor].shift();
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
    addCardToFirstFoundation: (foundationColor: string, card: string) =>
      dispatch(actions.addCardToFirstFoundation(foundationColor, card)),
    addCardToSecondFoundation: (foundationColor: string, card: string) =>
      dispatch(actions.addCardToSecondFoundation(foundationColor, card)),
    addCardToThirdFoundation: (foundationColor: string, card: string) =>
      dispatch(actions.addCardToThirdFoundation(foundationColor, card)),
    addCardToFourthFoundation: (foundationColor: string, card: string) =>
      dispatch(actions.addCardToFourthFoundation(foundationColor, card)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardStock);
