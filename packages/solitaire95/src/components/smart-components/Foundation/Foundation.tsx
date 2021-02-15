import React, { useContext } from "react";
import { connect } from "react-redux";
import { useDrop } from "react-dnd";
import { CardBackContext } from "../../game-containers";
import * as cardActions from "../../../store/actions/cardActions";
import * as scoreActions from "../../../store/actions/scoreActions";
import * as gameActions from "../../../store/actions/gameActions";
import { itemTypes } from "../../../configs/dragndropConfig";
import { cardConfigType } from "../../../configs/cardTypes";
import { Card } from "..";
import styles from "./Foundation.module.scss";

type foundationPropTypes = {
  cardsOnStock: cardConfigType[];
  addCardToFoundation: (
    card: cardConfigType,
    foundationNumber: string,
    foundationSuite: string
  ) => void;
  removeCardFromPile: (pileNumber: string) => void;
  addPoints: (points: number) => void;
  removeCardMovedToFoundation: (card: cardConfigType[]) => void;
  cardsFromStock: cardConfigType[];
  cardsOnFoundations: cardConfigType[];
  foundationId: string | number;
  startGame: () => void;
};

const Foundation: React.FC<foundationPropTypes> = (props) => {
  const {
    cardsOnStock,
    addCardToFoundation,
    removeCardFromPile,
    removeCardMovedToFoundation,
    cardsFromStock,
    cardsOnFoundations,
    foundationId,
    addPoints,
    startGame,
  } = props;

  const { cardBackImage } = useContext(CardBackContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const canBeDroppedOnFoundation = (card: any) => {
    const foundationTargetId = foundationTarget.props.id;

    const foundationObject =
      cardsOnFoundations[Object.keys(cardsOnFoundations)[foundationTargetId]];

    if (card.cardFront?.match(/ace/)) {
      return foundationObject.foundationSuite === undefined;
    } else {
      const cardsOnFoundation = foundationObject.cards;
      return (
        card.cardSuite === foundationObject.foundationSuite &&
        parseInt(cardsOnFoundation[cardsOnFoundation.length - 1][4]) ===
          card.cardOrder - 1
      );
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dropCardOnFoundation = (dragObject: any) => {
    const {
      cardFront,
      cardSuite,
      cardColor,
      cardOrder,
      pileNumber,
    } = dragObject;

    const cardConfig: cardConfigType = [
      cardFront,
      cardSuite,
      true,
      cardColor,
      cardOrder,
    ];

    const foundations = [
      "cardsOnFirstFoundation",
      "cardsOnSecondFoundation",
      "cardsOnThirdFoundation",
      "cardsOnFourthFoundation",
    ];

    const foundationTargetId = foundationTarget.props.id;

    addCardToFoundation(cardConfig, foundations[foundationTargetId], cardSuite);
    addPoints(10);
    startGame();
    if (typeof pileNumber === "number") {
      removeCardFromPile(pileNumber.toString());
    } else {
      removeCardMovedToFoundation(
        cardsFromStock.filter(
          (card) => `${card[0]}_${card[1]}` !== `${cardFront}_${cardSuite}`
        )
      );
    }
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: itemTypes.CARD,
    drop: (monitor) => {
      dropCardOnFoundation(monitor);
    },
    canDrop: canBeDroppedOnFoundation,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  const foundationTarget = (
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
      id={foundationId?.toString()}
    >
      {cardsOnStock?.length
        ? cardsOnStock.map((card, index) => (
            <Card
              cardFront={card[0]}
              cardSuite={card[1]}
              cardColor={card[3]}
              cardOrder={card[4]}
              cardBack={cardBackImage}
              isTurnedBack={false}
              key={index}
              foundationNumber={foundationId?.toString()}
            />
          ))
        : null}
    </div>
  );

  return <>{foundationTarget}</>;
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
      card: cardConfigType,
      foundationNumber: string,
      foundationSuite: string
    ) =>
      dispatch(
        cardActions.addCardToFoundation(card, foundationNumber, foundationSuite)
      ),
    removeCardFromPile: (pileNumber: string) =>
      dispatch(cardActions.removeCardFromPile(pileNumber)),
    removeCardMovedToFoundation: (card: cardConfigType[]) =>
      dispatch(cardActions.removeCardMovedToFoundation(card)),
    addPoints: (points: number) => dispatch(scoreActions.countScore(points)),
    startGame: () => dispatch(gameActions.startGame()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Foundation);