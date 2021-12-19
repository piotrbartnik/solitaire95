import React, { useRef, MouseEvent, useCallback } from "react";
import { connect } from "react-redux";
import { useDrop } from "react-dnd";
import {
  CardsDistributionInitialState,
  FoundationInitialState,
  GameState,
} from "../../../store/reducers/";
import {
  CardNameType,
  CardSuiteType,
  CardColorType,
} from "../../../configs/cardTypes";
import {
  removeCardFromPile,
  addCardToPile,
  removeCardFromStock,
  addCardToFoundation,
  removeCardFromFoundation,
  countScore,
  startGame,
  turnCardOnPile,
  setUndoAction,
} from "../../../store/actions/";
import {
  RemoveCardFromPileType,
  AddCardToPileType,
  RemoveCardFromStockType,
  AddCardToFoundationType,
  RemoveCardFromFoundationType,
  CountScoreType,
  StartGameType,
  TurnCardOnPileType,
  SetUndoActionType,
} from "../../../store/actions/actionTypes";
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
  gameStarted: boolean;
  outlineDragging: boolean;
  threeCardsOnTable: cardConfigType[];
  cardBackImage: string;
};

type PileDispatchTypes = {
  removeCardFromPile: RemoveCardFromPileType;
  addCardToPile: AddCardToPileType;
  removeCardFromStock: RemoveCardFromStockType;
  addCardToFoundation: AddCardToFoundationType;
  removeCardFromFoundation: RemoveCardFromFoundationType;
  addPoints: CountScoreType;
  startGame: StartGameType;
  turnCardOnPile: TurnCardOnPileType;
  setUndoAction: SetUndoActionType;
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
    gameStarted,
    setUndoAction,
    outlineDragging,
    threeCardsOnTable,
    cardBackImage,
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const dropCardOnPile = (dragObject: {
    cardFront: CardNameType;
    cardSuite: CardSuiteType;
    cardColor: CardColorType;
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
        !gameStarted && startGame();
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
        ),
        threeCardsOnTable?.filter(
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
        startGame,
        gameStarted
      ),
    [
      cardsOnFoundations,
      addCardToFoundation,
      removeCardFromPile,
      addPoints,
      startGame,
      gameStarted,
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
        setUndoAction([]);
      }
    },
    [turnCardOnPile, addPoints, setUndoAction]
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
          style={
            outlineDragging &&
            canDrop &&
            isOver &&
            index === cardsOnPile.length - 1
              ? { filter: "invert(100%)" }
              : undefined
          }
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
      id={`${pileIndex}`}
      style={
        outlineDragging && canDrop && isOver && !cardsOnPile.length
          ? { backgroundColor: "#ff00ff" }
          : undefined
      }
      role="list"
      aria-label={`pile ${pileIndex}`}
    >
      {distributeCards(cardsOnPile)}
    </div>
  );

  return <>{pileTarget}</>;
};

const mapStateToProps = (state: {
  cardDistribution: CardsDistributionInitialState;
  cardsOnFoundation: FoundationInitialState;
  gameState: GameState;
}) => {
  return {
    cardsFromStock: state.cardDistribution.cardsFromStock,
    cardsOnFoundations: state.cardsOnFoundation,
    cardsOnPiles: state.cardDistribution.cardsOnPiles,
    gameStarted: state.gameState.gameStarted,
    outlineDragging: state.gameState.outlineDragging,
    threeCardsOnTable: state.cardDistribution.threeCardsOnTable,
    cardBackImage: state.gameState.cardDeck,
  };
};

const mapDispatchToProps = {
  removeCardFromPile: removeCardFromPile,
  addCardToPile: addCardToPile,
  removeCardFromStock: removeCardFromStock,
  addCardToFoundation: addCardToFoundation,
  removeCardFromFoundation: removeCardFromFoundation,
  addPoints: countScore,
  startGame: startGame,
  turnCardOnPile: turnCardOnPile,
  setUndoAction: setUndoAction,
};

export const Pile = connect<PileStateTypes, PileDispatchTypes, PilePropTypes>(
  mapStateToProps,
  mapDispatchToProps
)(PileInternal);
