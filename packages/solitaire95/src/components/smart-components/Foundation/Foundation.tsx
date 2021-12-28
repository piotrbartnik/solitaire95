import React, { useContext } from "react";
import { connect } from "react-redux";
import { useDrop } from "react-dnd";
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
  removeCardFromFoundation,
  countVegasScore,
} from "../../../store/actions/";
import {
  AddCardToFoundationType,
  RemoveCardFromPileType,
  CountScoreType,
  RemoveCardFromStockType,
  StartGameType,
  RemoveCardFromFoundationType,
  CountVegasScoreType,
} from "../../../store/actions/actionTypes";
import { itemTypes } from "../../../configs/dragndropConfig";
import { cardConfigType } from "../../../configs/cardTypes";
import { Card } from "..";
import styles from "./Foundation.module.scss";
import { VegasContext } from "../../game-containers";

export type FoundationStateTypes = {
  cardsFromStock: cardConfigType[];
  cardsOnFoundations: FoundationInitialState;
  gameStarted: boolean;
  outlineDragging: boolean;
  threeCardsOnTable: cardConfigType[];
  cardBackImage: string;
};

export type FoundationDispatchTypes = {
  addCardToFoundation: AddCardToFoundationType;
  removeCardFromPile: RemoveCardFromPileType;
  addPoints: CountScoreType;
  removeCardFromStock: RemoveCardFromStockType;
  startGame: StartGameType;
  removeCardFromFoundation: RemoveCardFromFoundationType;
  addDollars: CountVegasScoreType;
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
    removeCardFromFoundation,
    outlineDragging,
    threeCardsOnTable,
    cardBackImage,
    addDollars,
  } = props;

  const { isVegas } = useContext(VegasContext);

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
      foundationNumber,
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
    !foundationNumber && addPoints(10);

    !foundationNumber && isVegas && addDollars(5);
    !gameStarted && startGame();

    if (typeof pileNumber === "number") {
      removeCardFromPile(pileNumber.toString());
    } else {
      removeCardFromStock(
        cardsFromStock.filter(
          (card) => `${card[0]}_${card[1]}` !== `${cardFront}_${cardSuite}`
        ),
        threeCardsOnTable?.filter(
          (card) => `${card[0]}_${card[1]}` !== `${cardFront}_${cardSuite}`
        )
      );
    }

    if (typeof foundationNumber === "string") {
      removeCardFromFoundation(foundationNumber);
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

  type DraggingStyleType = { filter?: string; backgroundColor?: string };

  const outlineStyling = (): DraggingStyleType => {
    if (isOver && canDrop && outlineDragging) {
      if (cardsOnFoundation?.length) {
        return { filter: "invert(100%)" };
      }
      return { backgroundColor: "#ff00ff" };
    }
    return {};
  };

  const foundationTarget = (
    <div
      className={styles.foundation}
      ref={drop}
      style={outlineStyling()}
      id={foundationId?.toString()}
      role="list"
      aria-label={`foundation ${foundationId}`}
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
    outlineDragging: state.gameState.outlineDragging,
    threeCardsOnTable: state.cardDistribution.threeCardsOnTable,
    cardBackImage: state.gameState.cardDeck,
  };
};

const mapDispatchToProps = {
  addCardToFoundation: addCardToFoundation,
  removeCardFromPile: removeCardFromPile,
  removeCardFromStock: removeCardFromStock,
  addPoints: countScore,
  startGame: startGame,
  removeCardFromFoundation: removeCardFromFoundation,
  addDollars: countVegasScore,
};

export const Foundation = connect<
  FoundationStateTypes,
  FoundationDispatchTypes,
  FoundationPropTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(FoundationInternal);
