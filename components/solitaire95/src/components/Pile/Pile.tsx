import React, { useRef, useContext } from "react";
import { connect } from "react-redux";
import { useDrop } from "react-dnd";
import * as actions from "../../store/actions/cardActions";
import { CardBackContext } from "../../containers/";
import { itemTypes } from "../../configs/dragndropConfig";
import { cardConfigType } from "../../configs/cardTypes";
import { Card } from "..";
import styles from "./Pile.module.scss";
import { moveToFoundation } from "../../helpers/cardMoving";
import { useSetCardsPositionFromTopOnPiles } from "./PileHooks";

type propTypes = {
  cardsOnPile: cardConfigType[];
  pileIndex: number;
  removeCardFromPile?: any;
  addCardToPile?: any;
  removeCardMovedToFoundation?: any;
  cardsFromStock?: cardConfigType[];
  cardsOnFoundations: any;
  addCardToFoundation: any;
  cardsOnPiles: any;
  removeCardFromFoundation: any;
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
    cardsOnPiles,
    removeCardFromFoundation,
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const cardBack = useContext(CardBackContext);

  const dropCardOnPile = (dragObject: any, item: any) => {
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
      ?.map((el: string[]) => `${el[0]}_${el[1]}`)
      .indexOf(`${cardFront}_${cardSuite}`);

    const cardsToDrag = cardsOnPiles[pileNumber]?.slice(
      indexOfDraggedCardOnPile
    );

    if (pileNumber !== undefined) {
      cardsToDrag.forEach((card: any) => {
        const cardToDrag: cardConfigType = [
          card[0],
          card[1],
          true,
          card[3],
          card[4],
        ];
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

  const canBeDroppedOnPile = (draggedCard: any) => {
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
    drop: (monitor, item) => {
      dropCardOnPile(monitor, item);
    },
    canDrop: canBeDroppedOnPile,
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
        ? !Boolean(isTurnedBackString)
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
            cardBack={cardBack}
            isTurnedBack={shouldBeTurnedAfterDrag}
            canBeTurned={canBeTurned}
            pileNumber={pileIndex}
            onDoubleClick={(e: any) =>
              moveToFoundation(
                e,
                cardsOnFoundations,
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

const mapStateToProps = (state: any) => {
  return {
    cardsFromStock: state.cardDistribution.cardsFromStock,
    cardsOnFoundations: state.cardsOnFoundation,
    cardsOnPiles: state.cardDistribution.cardsOnPiles,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeCardFromPile: (pileNumber: string) =>
      dispatch(actions.removeCardFromPile(pileNumber)),
    addCardToPile: (pileNumber: string, cardToPile: cardConfigType) =>
      dispatch(actions.addCardToPile(pileNumber, cardToPile)),
    removeCardMovedToFoundation: (payload: string[]) => {
      dispatch(actions.removeCardMovedToFoundation(payload));
    },
    addCardToFoundation: (
      card: cardConfigType,
      foundationNumber: string,
      foundationSuite: string
    ) =>
      dispatch(
        actions.addCardToFoundation(card, foundationNumber, foundationSuite)
      ),
    removeCardFromFoundation: (foundationNumber: string) =>
      dispatch(actions.removeCardFromFoundation(foundationNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pile);
