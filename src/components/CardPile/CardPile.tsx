import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cardActions";
import { Card } from "../";
import { cardDestinationConfig } from "../../configs/cardDestinationConfig";
import styles from "./CardPile.module.scss";

type propTypes = {
  cardsOnPile: string[];
  cardsFromPile: string[];
  takeOneFromPile: any;
  reversePile: any;
  addCardToFirstPile: any;
  removeCardMovedToDestinationPile: any;
};

const CardPile: React.FC<propTypes> = (props: propTypes) => {
  const {
    cardsOnPile,
    cardsFromPile,
    takeOneFromPile,
    reversePile,
    addCardToFirstPile,
    removeCardMovedToDestinationPile,
  } = props;

  const moveFirstFromTheTop = () => {
    if (cardsOnPile.length) {
      const cardToPush: any = cardsOnPile.pop();
      takeOneFromPile(cardToPush);
    } else {
      reversePile(cardsFromPile.reverse());
    }
  };

  const moveToCardDestination = (e: any) => {
    if (e.target.dataset.cardname === cardDestinationConfig[0]) {
      addCardToFirstPile(e.target.dataset.cardname);
      removeCardMovedToDestinationPile(
        cardsFromPile.filter((el) => el !== e.target.dataset.cardname)
      );
      cardDestinationConfig.shift();
    }
  };

  return (
    <>
      <div className={styles.cardPile} onClick={moveFirstFromTheTop}>
        <div className={styles.cardPile__cardHolder}>
          {cardsOnPile.length
            ? cardsOnPile.map((el) => (
                <Card front={el} back={"acorns"} isTurnedBack={true} />
              ))
            : null}
        </div>
      </div>
      <div className={styles.cardsOnTable}>
        {cardsFromPile.map((el) => (
          <Card
            front={el}
            back={"acorns"}
            isTurnedBack={false}
            onDoubleClick={moveToCardDestination}
          />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cardsOnPile: state.cardDistribution.cardsOnPile,
    cardsFromPile: state.cardDistribution.cardsFromPile,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    takeOneFromPile: (payload: string) =>
      dispatch(actions.takeOneFromPile(payload)),
    reversePile: (payload: string[]) => dispatch(actions.reversePile(payload)),
    addCardToFirstPile: (payload: string[]) =>
      dispatch(actions.addCardToFirstDestinationPile(payload)),
    removeCardMovedToDestinationPile: (payload: string[]) => {
      dispatch(actions.removeCardMovedToDestinationPile(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardPile);
