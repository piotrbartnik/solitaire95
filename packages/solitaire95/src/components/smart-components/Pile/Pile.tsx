import React, { useRef, useContext, MouseEvent } from "react";
import { connect } from "react-redux";
import { useDrop } from "react-dnd";
import { CardsDistributionInitialState } from "../../../store/reducers/cardsDistributionReducer";
import { FoundationInitialState } from "../../../store/reducers/foundationReducer";
import * as cardActions from "../../../store/actions/cardActions";
import * as scoreActions from "../../../store/actions/scoreActions";
import * as gameActions from "../../../store/actions/gameActions";
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
  removeCardMovedToFoundation: (cards: cardConfigType[]) => void;
  addCardToFoundation: (
    card: cardConfigType,
    foundationNumber: string,
    foundationSuite: string
  ) => void;
  removeCardFromFoundation: (foundationNumber: string) => void;
  addPoints: (points: number) => void;
  startGame: () => void;
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
    removeCardMovedToFoundation,
    cardsFromStock,
    cardsOnFoundations,
    addCardToFoundation,
    cardsOnPiles,
    removeCardFromFoundation,
    addPoints,
    startGame,
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
      removeCardFromFoundation(foundationNumber);
      addCardToPile((ref.current as HTMLDivElement).id, cardToPile);
    } else {
      addCardToPile((ref.current as HTMLDivElement).id, cardToPile);
      removeCardMovedToFoundation(
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
          data-turned={shouldBeTurnedAfterDrag}
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
            onDoubleClick={(e: MouseEvent<HTMLInputElement>) =>
              moveToFoundation(
                e,
                cardsOnFoundations,
                addCardToFoundation,
                removeCardFromPile,
                true,
                addPoints,
                undefined,
                startGame
              )
            }
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
      dispatch(cardActions.removeCardFromPile(pileNumber)),
    addCardToPile: (pileNumber: string, cardToPile: cardConfigType) =>
      dispatch(cardActions.addCardToPile(pileNumber, cardToPile)),
    removeCardMovedToFoundation: (cards: cardConfigType[]) => {
      dispatch(cardActions.removeCardMovedToFoundation(cards));
    },
    addCardToFoundation: (
      card: cardConfigType,
      foundationNumber: string,
      foundationSuite: string
    ) =>
      dispatch(
        cardActions.addCardToFoundation(card, foundationNumber, foundationSuite)
      ),
    removeCardFromFoundation: (foundationNumber: string) =>
      dispatch(cardActions.removeCardFromFoundation(foundationNumber)),
    addPoints: (payload: number) => {
      dispatch(scoreActions.countScore(payload));
    },
    startGame: () => dispatch(gameActions.startGame()),
  };
};

export const Pile = connect<PileStateTypes, PileDispatchTypes, PilePropTypes>(
  mapStateToProps,
  mapDispatchToProps
)(PileInternal);
