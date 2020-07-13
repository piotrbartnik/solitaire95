import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cardActions";
import { Card } from "..";
import {
  foundationHeartsConfig,
  foundationClubsConfig,
  foundationDiamondsConfig,
  foundationSpadesConfig,
} from "../../configs/foundationConfig";
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
    if (e.target.dataset.cardname === foundationHeartsConfig[0]) {
      addCardToFirstFoundation(e.target.dataset.cardname);
      removeCardMovedToFoundation(
        cardsFromStock.filter((el) => el !== e.target.dataset.cardname)
      );
      foundationHeartsConfig.shift();
    }
    if (e.target.dataset.cardname === foundationDiamondsConfig[0]) {
      addCardToSecondFoundation(e.target.dataset.cardname);
      removeCardMovedToFoundation(
        cardsFromStock.filter((el) => el !== e.target.dataset.cardname)
      );
      foundationDiamondsConfig.shift();
    }
    if (e.target.dataset.cardname === foundationClubsConfig[0]) {
      addCardToThirdFoundation(e.target.dataset.cardname);
      removeCardMovedToFoundation(
        cardsFromStock.filter((el) => el !== e.target.dataset.cardname)
      );
      foundationClubsConfig.shift();
    }
    if (e.target.dataset.cardname === foundationSpadesConfig[0]) {
      addCardToFourthFoundation(e.target.dataset.cardname);
      removeCardMovedToFoundation(
        cardsFromStock.filter((el) => el !== e.target.dataset.cardname)
      );
      foundationSpadesConfig.shift();
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
    addCardToFirstFoundation: (payload: string[]) =>
      dispatch(actions.addCardToFirstFoundation(payload)),
    addCardToSecondFoundation: (payload: string[]) =>
      dispatch(actions.addCardToSecondFoundation(payload)),
    addCardToThirdFoundation: (payload: string[]) =>
      dispatch(actions.addCardToThirdFoundation(payload)),
    addCardToFourthFoundation: (payload: string[]) =>
      dispatch(actions.addCardToFourthFoundation(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardStock);
