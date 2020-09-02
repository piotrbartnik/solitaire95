import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cardActions";
import { useDrop } from "react-dnd";
import { itemTypes } from "../../configs/dragndropConfig";
import { Card } from "..";
import styles from "./Foundation.module.scss";

type propTypes = {
  cardsOnStock?: string[];
  addCardToFoundation?: any;
  removeCardFromPile?: any;
  removeCardMovedToFoundation?: any;
  cardsFromStock: string[];
};

const Foundation: React.FC<propTypes> = (props) => {
  const {
    cardsOnStock,
    addCardToFoundation,
    removeCardFromPile,
    removeCardMovedToFoundation,
    cardsFromStock,
  } = props;

  const isFirstFoundation = (foundation: any, targetId: any) => {
    return targetId.targetId === "T24";
  };
  const dropCardOnFoundation = (dragObject: any, item: any) => {
    const { front, cardSuite, pileNumber } = dragObject;

    const { targetId } = item;
    const foundations = [
      "cardsOnFirstFoundation",
      "cardsOnSecondFoundation",
      "cardsOnThirdFoundation",
      "cardsOnFourthFoundation",
    ];
    addCardToFoundation(
      front,
      foundations[targetId.replace(/\D/, "") - 24],
      cardSuite
    );
    if (pileNumber) {
      removeCardFromPile(pileNumber);
    } else {
      removeCardMovedToFoundation(cardsFromStock.filter((el) => el !== front));
    }
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: itemTypes.CARD,
    drop: (monitor, item) => {
      dropCardOnFoundation(monitor, item);
    },
    canDrop: isFirstFoundation,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      className={styles.foundation}
      ref={drop}
      style={
        isOver && canDrop
          ? { border: "2px solid blue" }
          : isOver
          ? { border: "2px solid red" }
          : undefined
      }
    >
      {cardsOnStock?.length
        ? cardsOnStock.map((el, index) => (
            <Card front={el} back={"acorns"} isTurnedBack={false} key={index} />
          ))
        : null}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { cardsFromStock: state.cardDistribution.cardsFromStock };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCardToFoundation: (
      card: string,
      foundationNumber: string,
      foundationSuite: string
    ) =>
      dispatch(
        actions.addCardToFoundation(card, foundationNumber, foundationSuite)
      ),
    removeCardFromPile: (pileNumber: string) =>
      dispatch(actions.removeCardFromPile(pileNumber)),
    removeCardMovedToFoundation: (payload: string[]) => {
      dispatch(actions.removeCardMovedToFoundation(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Foundation);
