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
};

const Foundation: React.FC<propTypes> = (props) => {
  const { cardsOnStock, addCardToFoundation } = props;

  const dropCardOnFoundation = (dragObject: any, item: any) => {
    const { front, cardSuite } = dragObject;
    const { targetId } = item;
    const foundations = [
      "cardsOnFirstFoundation",
      "cardsOnSecondFoundation",
      "cardsOnThirdFoundation",
      "cardsOnFourthFoundation",
    ];
    addCardToFoundation(
      front,
      foundations[targetId.replace(/\D/, "") - 1],
      cardSuite
    );
    // removeCardFromPile();
  };

  const [{ isOver }, drop] = useDrop({
    accept: itemTypes.CARD,
    drop: (monitor, item) => {
      dropCardOnFoundation(monitor, item);
      console.log(monitor, item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      className={styles.foundation}
      ref={drop}
      style={isOver ? { border: "2px solid red" } : undefined}
    >
      {cardsOnStock?.length
        ? cardsOnStock.map((el) => (
            <Card front={el} back={"acorns"} isTurnedBack={false} />
          ))
        : null}
    </div>
  );
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
    removeCardFromPile: () => dispatch(actions.removeCardFromPile()),
  };
};

export default connect(undefined, mapDispatchToProps)(Foundation);
