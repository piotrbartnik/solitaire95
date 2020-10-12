import React, { useRef } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cardActions";
import { useDrop } from "react-dnd";
import { itemTypes } from "../../configs/dragndropConfig";
import { foundationConfig } from "../../configs/foundationConfig";
import { Card } from "..";
import styles from "./Pile.module.scss";
import { moveToFoundation } from "../../helpers/cardMoving";

type cardObject = {
  cardFront: string;
  isTurnedBack: boolean | undefined;
  cardColor: string;
  cardSuite: string;
  cardOrder: string;
};

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

  const dropCardOnPile = (dragObject: any, item: any) => {
    const {
      cardFront,
      cardSuite,
      cardColor,
      cardOrder,
      pileNumber,
    } = dragObject;

    addCardToPile(
      ref.current.id,
      cardFront,
      true,
      cardColor,
      cardSuite,
      cardOrder
    );

    if (pileNumber !== undefined) {
      removeCardFromPile(pileNumber);
    } else {
      removeCardMovedToFoundation(
        cardsFromStock?.filter((card) => card[0] !== cardFront)
      );
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
            cardFront={card[0]}
            cardSuite={card[1]}
            cardColor={card[3]}
            cardOrder={card[4]}
            back={"acorns"}
            isTurnedBack={shouldBeTurnedAfterDrag}
            pileNumber={pileIndex}
            onDoubleClick={(e: any) =>
              moveToFoundation(
                e,
                cardsOnFoundations,
                foundationConfig,
                addCardToFoundation,
                removeCardFromPile,
                true
              )
            }
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
    addCardToPile: (
      pileNumber: string,
      cardFront: string,
      isTurnedBack: boolean,
      cardColor: string,
      cardSuite: string,
      cardOrder: string
    ) =>
      dispatch(
        actions.addCardToPile(
          pileNumber,
          cardFront,
          isTurnedBack,
          cardColor,
          cardSuite,
          cardOrder
        )
      ),
    removeCardMovedToFoundation: (payload: string[]) => {
      dispatch(actions.removeCardMovedToFoundation(payload));
    },
    addCardToFoundation: (
      card: cardObject,
      foundationNumber: string,
      foundationSuite: string
    ) =>
      dispatch(
        actions.addCardToFoundation(card, foundationNumber, foundationSuite)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pile);
