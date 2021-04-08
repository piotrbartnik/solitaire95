import React, { useRef, useContext, MouseEvent, useCallback } from "react";
import { connect } from "react-redux";
import { useDrop } from "react-dnd";
import {
  CardsDistributionInitialState,
  FoundationInitialState,
} from "../../../store/reducers/";
import {
  removeCardFromPile,
  addCardToPile,
  removeCardFromStock,
  addCardToFoundation,
  removeCardFromFoundation,
  countScore,
  startGame,
  turnCardOnPile,
} from "../../../store/actions/";
import { CardBackContext } from "../../game-containers";
import { itemTypes } from "../../../configs/dragndropConfig";
import { cardConfigType } from "../../../configs/cardTypes";
import { Card } from "..";
import styles from "./Pile.module.scss";
import { moveToFoundation } from "../../../helpers/cardMoving";
import { useSetCardsPositionFromTopOnPiles } from "./PileHooks";

type PileStateTypes = {
  cardsFromStock: cardConfigType[];
  cardsOnFoundations: FoundationInitialState;
  cardsOnPiles: { [key: string]: cardConfigType[] };
};

type PileDispatchTypes = {
  removeCardFromPile: (pile: string) => void;
  addCardToPile: (pileNumber: string, cardToPile: cardConfigType) => void;
  removeCardFromStock: (cards: cardConfigType[]) => void;
  addCardToFoundation: (
    card: cardConfigType,
    foundationNumber: string,
    foundationSuite: string
  ) => void;
  removeCardFromFoundation: (foundationNumber: string) => void;
  addPoints: (points: number) => void;
  startGame: () => void;
  turnCardOnPile: (cardToTurn: number) => void;
};

type PilePropTypes = {
  cardsOnPile: cardConfigType[];
  pileIndex: number;
};

const PileInternal: React.FC<
  PileStateTypes & PileDispatchTypes & PilePropTypes
> = (props) => {
  const {
    cardsOnPile,
    pileIndex,
    removeCardFromPile,
    addCardToPile,
    removeCardFromStock,
    cardsFromStock,
    cardsOnFoundations,
    addCardToFoundation,
    cardsOnPiles,
    removeCardFromFoundation,
    addPoints,
    startGame,
    turnCardOnPile,
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const { cardBackImage } = useContext(CardBackContext);

  const dropCardOnPile = (dragObject: {
    cardFront: string;
    cardSuite: string;
    cardColor: string;
    cardOrder: number;
    pileNumber: string;
    foundationNumber: string;
  }) => {
    const {
      cardFront,
      cardSuite,
      cardColor,
      cardOrder,
      pileNumber,
      foundationNumber,
    } = dragObject;

    const cardToPile: cardConfigType = [
      cardFront,
      cardSuite,
      true,
      cardColor,
      cardOrder,
    ];

    const indexOfDraggedCardOnPile = cardsOnPiles[pileNumber]
      ?.map((el: cardConfigType) => `${el[0]}_${el[1]}`)
      .indexOf(`${cardFront}_${cardSuite}`);

    const cardsToDrag = cardsOnPiles[pileNumber]?.slice(
      indexOfDraggedCardOnPile
    );

    if (pileNumber !== undefined) {
      cardsToDrag.forEach((card: cardConfigType) => {
        const cardToDrag: cardConfigType = [
          card[0],
          card[1],
          true,
          card[3],
          card[4],
        ];
        startGame();
        return addCardToPile((ref.current as HTMLDivElement).id, cardToDrag);
      });
      cardsToDrag.forEach(() => removeCardFromPile(pileNumber));
    } else if (foundationNumber) {
      addPoints(-15);
      removeCardFromFoundation(foundationNumber);
      addCardToPile((ref.current as HTMLDivElement).id, cardToPile);
    } else {
      addPoints(5);
      addCardToPile((ref.current as HTMLDivElement).id, cardToPile);
      removeCardFromStock(
        cardsFromStock?.filter(
          (card) => `${card[0]}_${card[1]}` !== `${cardFront}_${cardSuite}`
        )
      );
    }
  };

  const canBeDroppedOnPile = (draggedCard: {
    cardFront: string;
    cardOrder: string;
    cardColor: string;
  }) => {
    const cardsOnPileLength = pileTarget.props.children.length;
    const frontCardOnPile =
      pileTarget.props.children[cardsOnPileLength - 1]?.props.children.props;
    const frontCardOrder = frontCardOnPile?.cardOrder;
    const frontCardColor = frontCardOnPile?.cardColor;

    if (draggedCard.cardFront === "king" && !cardsOnPileLength) {
      return true;
    }
    return (
      frontCardOrder - 1 === parseInt(draggedCard.cardOrder) &&
      frontCardColor !== draggedCard.cardColor
    );
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: itemTypes.CARD,
    drop: (monitor) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dropCardOnPile(monitor as any);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    canDrop: (draggedCard) => canBeDroppedOnPile(draggedCard as any),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  drop(ref, null);

  const moveToFoundationCallback = useCallback(
    (e: MouseEvent<HTMLInputElement>) =>
      moveToFoundation(
        e,
        cardsOnFoundations,
        addCardToFoundation,
        removeCardFromPile,
        true,
        addPoints,
        undefined,
        startGame
      ),
    [
      cardsOnFoundations,
      addCardToFoundation,
      removeCardFromPile,
      addPoints,
      startGame,
    ]
  );

  const turnCardOnPileCallback = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      const pileNumber = e.target.parentNode.dataset?.pilenumber;
      const cardOnPileNumber = e.target.parentNode.dataset?.positiononpile;
      const isTargetCardTurnedFront = e.target.dataset?.cardname;
      if (cardOnPileNumber && pileNumber && !isTargetCardTurnedFront) {
        addPoints(5);
        turnCardOnPile(pileNumber);
      }
    },
    [turnCardOnPile, addPoints]
  );

  const distributeCards = (cardsOnPile: cardConfigType[]) =>
    cardsOnPile.map((card, index) => {
      const isTurnedBackString = card[2];
      const cardsOnPileLength = cardsOnPile.length;
      const shouldBeTurnedAfterDrag = isTurnedBackString
        ? !isTurnedBackString
        : pileIndex > index;
      const canBeTurned =
        !isTurnedBackString && cardsOnPileLength - 1 === index ? true : false;
      return cardsOnPileLength > 0 ? (
        <div
          className={styles[`pile__${index}`]}
          data-turnedback={shouldBeTurnedAfterDrag}
          key={`${index}${card[0]}${card[1]}${card[3]}${card[4]}`}
        >
          <Card
            cardFront={card[0]}
            cardSuite={card[1]}
            cardColor={card[3]}
            cardOrder={card[4]}
            cardBack={cardBackImage}
            isTurnedBack={shouldBeTurnedAfterDrag}
            canBeTurned={canBeTurned}
            pileNumber={pileIndex}
            positionOnPile={index}
            onDoubleClick={moveToFoundationCallback}
            onClick={turnCardOnPileCallback}
          />
        </div>
      ) : (
        <div id={`${pileIndex}`} className={styles[`pile__${index}`]}></div>
      );
    });

  useSetCardsPositionFromTopOnPiles(ref as { current: HTMLDivElement });

  const pileTarget = (
    <div
      className={styles.pile__container}
      ref={ref}
      style={
        canDrop && isOver
          ? { border: "2px solid blue" }
          : isOver
          ? { border: "2px solid red" }
          : undefined
      }
      id={`${pileIndex}`}
    >
      {distributeCards(cardsOnPile)}
    </div>
  );

  return <>{pileTarget}</>;
};

const mapStateToProps = (state: {
  cardDistribution: CardsDistributionInitialState;
  cardsOnFoundation: FoundationInitialState;
}) => {
  return {
    cardsFromStock: state.cardDistribution.cardsFromStock,
    cardsOnFoundations: state.cardsOnFoundation,
    cardsOnPiles: state.cardDistribution.cardsOnPiles,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    removeCardFromPile: (pileNumber: string) =>
      dispatch(removeCardFromPile(pileNumber)),
    addCardToPile: (pileNumber: string, cardToPile: cardConfigType) =>
      dispatch(addCardToPile(pileNumber, cardToPile)),
    removeCardFromStock: (cards: cardConfigType[]) => {
      dispatch(removeCardFromStock(cards));
    },
    addCardToFoundation: (
      card: cardConfigType,
      foundationNumber: string,
      foundationSuite: string
    ) => dispatch(addCardToFoundation(card, foundationNumber, foundationSuite)),
    removeCardFromFoundation: (foundationNumber: string) =>
      dispatch(removeCardFromFoundation(foundationNumber)),
    addPoints: (payload: number) => {
      dispatch(countScore(payload));
    },
    startGame: () => dispatch(startGame()),
    turnCardOnPile: (cardToTurn: number) =>
      dispatch(turnCardOnPile(cardToTurn)),
  };
};

export const Pile = connect<PileStateTypes, PileDispatchTypes, PilePropTypes>(
  mapStateToProps,
  mapDispatchToProps
)(PileInternal);
