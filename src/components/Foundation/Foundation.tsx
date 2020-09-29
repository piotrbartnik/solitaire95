import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cardActions";
import { useDrop } from "react-dnd";
import { itemTypes } from "../../configs/dragndropConfig";
import { foundationConfig } from "../../configs/foundationConfig";
import { Card } from "..";
import styles from "./Foundation.module.scss";

type propTypes = {
  cardsOnStock?: string[];
  addCardToFoundation?: any;
  removeCardFromPile?: any;
  removeCardMovedToFoundation?: any;
  cardsFromStock: string[];
  cardsOnFoundations: any;
};

const Foundation: React.FC<propTypes> = (props) => {
  const {
    cardsOnStock,
    addCardToFoundation,
    removeCardFromPile,
    removeCardMovedToFoundation,
    cardsFromStock,
    cardsOnFoundations,
  } = props;

  const isFirstFoundation = (card: any, hoveredFoundation: any) => {
    const foundationObject =
      cardsOnFoundations[
        Object.keys(cardsOnFoundations)[
          hoveredFoundation.targetId.replace(/\D/, "") - 24
        ]
      ];
    console.log(foundationConfig);
    if (card.front.match(/ace/)) {
      return foundationObject.foundationSuite === undefined;
    } else {
      return (
        card.cardSuite === foundationObject.foundationSuite &&
        foundationConfig[card.cardSuite][0] === card.front
      );
    }
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
    if (typeof pileNumber === "number") {
      removeCardFromPile(pileNumber);
      foundationConfig[cardSuite].shift();
    } else {
      removeCardMovedToFoundation(cardsFromStock.filter((el) => el !== front));
      foundationConfig[cardSuite].shift();
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
          ? { outline: "5px solid blue" }
          : isOver
          ? { outline: "5px solid red" }
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
  return {
    cardsFromStock: state.cardDistribution.cardsFromStock,
    cardsOnFoundations: state.cardsOnFoundation,
  };
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
