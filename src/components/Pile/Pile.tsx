import React, { useRef } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cardActions";
import { useDrop } from "react-dnd";
import { itemTypes } from "../../configs/dragndropConfig";
import { Card } from "..";
import styles from "./Pile.module.scss";

type propTypes = {
  cardsOnPile: string[];
  pileIndex: number;
  removeCardFromPile?: any;
  addCardToPile?: any;
};

const Pile: React.FC<propTypes> = (props: propTypes) => {
  const { cardsOnPile, pileIndex, removeCardFromPile, addCardToPile } = props;

  const ref: any = useRef(null);

  const dropCardOnPile = (dragObject: any, item: any) => {
    const { front, pileNumber } = dragObject;

    addCardToPile(ref.current.id, front);

    removeCardFromPile(pileNumber);
  };

  const [{ isOver }, drop] = useDrop({
    accept: itemTypes.CARD,
    drop: (monitor, item) => {
      dropCardOnPile(monitor, item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  drop(ref, null);

  const distributeCards = (cardsOnPile: string[]) =>
    cardsOnPile.map((el, index) => {
      return cardsOnPile.length > 0 ? (
        <div className={styles[`pile__${index}`]}>
          <Card
            front={el}
            back={"acorns"}
            isTurnedBack={index !== cardsOnPile.length - 1}
            pileNumber={pileIndex}
          />
        </div>
      ) : (
        <div id={`${pileIndex}`} className={styles[`pile__${index}`]}></div>
      );
    });

  return (
    <div
      className={styles.pile__container}
      ref={ref}
      style={isOver ? { border: "2px solid red" } : undefined}
      id={`${pileIndex}`}
    >
      {distributeCards(cardsOnPile)}
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeCardFromPile: (pileNumber: string) =>
      dispatch(actions.removeCardFromPile(pileNumber)),
    addCardToPile: (pileNumber: string, card: string) =>
      dispatch(actions.addCardToPile(pileNumber, card)),
  };
};

export default connect(undefined, mapDispatchToProps)(Pile);
