import React, { useRef } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cardActions";
import { useDrop } from "react-dnd";
import { itemTypes } from "../../configs/dragndropConfig";
import { foundationConfig } from "../../configs/foundationConfig";
import { Card } from "..";
import styles from "./Pile.module.scss";

type propTypes = {
  cardsOnPile: string[];
  pileIndex: number;
  removeCardFromPile?: any;
  addCardToPile?: any;
  removeCardMovedToFoundation?: any;
  cardsFromStock?: string[];
  cardsOnFoundations: any;
  addCardToFoundation: any;
};

const Pile: React.FC<propTypes> = (props: propTypes) => {
  const {
    cardsOnPile,
    pileIndex,
    removeCardFromPile,
    addCardToPile,
    removeCardMovedToFoundation,
    cardsFromStock,
    cardsOnFoundations,
    addCardToFoundation,
  } = props;

  const ref: any = useRef(null);

  const moveToFoundation = (e: any) => {
    const { cardname, pilenumber } = e.target.dataset;
    if (cardname.match("ace")) {
      let foundationToPopulate: string[] = [];
      Object.keys(cardsOnFoundations).forEach((foundation) => {
        if (!cardsOnFoundations[foundation].cards.length) {
          foundationToPopulate.push(foundation);
        }
      });
      if (!cardsOnFoundations[foundationToPopulate[0]].cards.length) {
        addCardToFoundation(
          cardname,
          foundationToPopulate[0],
          e.target.dataset.suite
        );
        removeCardFromPile(pilenumber);
        foundationConfig[e.target.dataset.suite].shift();
      }
    }

    if (!cardname.match("ace")) {
      Object.keys(cardsOnFoundations).forEach((foundation) => {
        if (
          cardsOnFoundations[foundation].foundationSuite ===
            e.target.dataset.suite &&
          foundationConfig[
            cardsOnFoundations[foundation].foundationSuite
          ][0] === cardname
        ) {
          foundationConfig[e.target.dataset.suite].shift();
          removeCardFromPile(pilenumber);
          addCardToFoundation(cardname, foundation);
        }
      });
    }
  };

  const dropCardOnPile = (dragObject: any, item: any) => {
    const { front, pileNumber, cardPosition } = dragObject;

    addCardToPile(ref.current.id, front, cardPosition);

    if (pileNumber !== undefined) {
      removeCardFromPile(pileNumber);
    } else {
      removeCardMovedToFoundation(cardsFromStock?.filter((el) => el !== front));
    }
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
    cardsOnPile.map((card, index) => {
      const isTurnedBackString = card[2];
      const shouldBeTurnedAfterDrag = isTurnedBackString
        ? !Boolean(isTurnedBackString)
        : pileIndex > index;
      return cardsOnPile.length > 0 ? (
        <div
          className={styles[`pile__${index}`]}
          data-turned={shouldBeTurnedAfterDrag}
          key={index}
        >
          <Card
            front={`${card[0]}_${card[1]}`}
            back={"acorns"}
            isTurnedBack={shouldBeTurnedAfterDrag}
            pileNumber={pileIndex}
            onDoubleClick={moveToFoundation}
            suite={card[1]}
            color={card[3]}
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

const mapStateToProps = (state: any) => {
  return {
    cardsFromStock: state.cardDistribution.cardsFromStock,
    cardsOnFoundations: state.cardsOnFoundation,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeCardFromPile: (pileNumber: string) =>
      dispatch(actions.removeCardFromPile(pileNumber)),
    addCardToPile: (pileNumber: string, card: string, isTurnedBack: boolean) =>
      dispatch(actions.addCardToPile(pileNumber, card, isTurnedBack)),
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

export default connect(mapStateToProps, mapDispatchToProps)(Pile);
