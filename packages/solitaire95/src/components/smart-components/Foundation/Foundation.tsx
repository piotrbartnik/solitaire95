import React, { useContext } from "react";
import { connect } from "react-redux";
import { useDrop } from "react-dnd";
import { CardBackContext } from "../../game-containers";
import {
  CardsDistributionInitialState,
  FoundationInitialState,
  GameState,
} from "../../../store/reducers/";
import {
  addCardToFoundation,
  removeCardFromPile,
  removeCardFromStock,
  startGame,
  countScore,
} from "../../../store/actions/";
import { itemTypes } from "../../../configs/dragndropConfig";
import { cardConfigType } from "../../../configs/cardTypes";
import { Card } from "..";
import styles from "./Foundation.module.scss";

export type FoundationStateTypes = {
  cardsFromStock: cardConfigType[];
  cardsOnFoundations: FoundationInitialState;
  gameStarted: boolean;
};

export type FoundationDispatchTypes = {
  addCardToFoundation: (
    card: cardConfigType,
    foundationNumber: string,
    foundationSuite: string
  ) => void;
  removeCardFromPile: (pileNumber: string) => void;
  addPoints: (points: number) => void;
  removeCardFromStock: (card: cardConfigType[]) => void;
  startGame: () => void;
};

export type FoundationPropTypes = {
  cardsOnFoundation: cardConfigType[];
  foundationId: string | number;
};

const FoundationInternal: React.FC<
  FoundationPropTypes & FoundationDispatchTypes & FoundationStateTypes
> = (props) => {
  const {
    cardsOnFoundation,
    addCardToFoundation,
    removeCardFromPile,
    removeCardFromStock,
    cardsFromStock,
    cardsOnFoundations,
    foundationId,
    addPoints,
    startGame,
    gameStarted,
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
      const resolvedCardsOnFoundation = foundationObject.cards;
      return (
        card.cardSuite === foundationObject.foundationSuite &&
        parseInt(
          resolvedCardsOnFoundation[
            resolvedCardsOnFoundation.length - 1
          ][4] as string
        ) ===
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
    !gameStarted && startGame();

    if (typeof pileNumber === "number") {
      removeCardFromPile(pileNumber.toString());
    } else {
      removeCardFromStock(
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
      {cardsOnFoundation?.length
        ? cardsOnFoundation.map((card, index) => (
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

const mapStateToProps = (state: {
  cardDistribution: CardsDistributionInitialState;
  cardsOnFoundation: FoundationInitialState;
  gameState: GameState;
}) => {
  return {
    cardsFromStock: state.cardDistribution.cardsFromStock,
    cardsOnFoundations: state.cardsOnFoundation,
    gameStarted: state.gameState.gameStarted,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    addCardToFoundation: (
      card: cardConfigType,
      foundationNumber: string,
      foundationSuite: string
    ) => dispatch(addCardToFoundation(card, foundationNumber, foundationSuite)),
    removeCardFromPile: (pileNumber: string) =>
      dispatch(removeCardFromPile(pileNumber)),
    removeCardFromStock: (card: cardConfigType[]) =>
      dispatch(removeCardFromStock(card)),
    addPoints: (points: number) => dispatch(countScore(points)),
    startGame: () => dispatch(startGame()),
  };
};

export const Foundation = connect<
  FoundationStateTypes,
  FoundationDispatchTypes,
  FoundationPropTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(FoundationInternal);
