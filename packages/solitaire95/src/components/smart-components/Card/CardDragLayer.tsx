import React, { RefObject, useMemo } from "react";
import CSS from "csstype";
import { useDragLayer } from "react-dnd";
import { connect } from "react-redux";
import { CardsDistributionInitialState } from "../../../store/reducers/";
import { itemTypes } from "../../../configs/dragndropConfig";
import { cardFrontsImages } from "../../../static/cardsFronts";
import { cardConfigType } from "../../../configs/cardTypes";

type CardDragPropTypes = {
  pilesContainer: RefObject<HTMLDivElement>;
  outlineDragging: boolean;
};

type CardDragLayerStateTypes = {
  cardsOnPiles: { [key: string]: cardConfigType[] };
};

const CardDragLayerInternal: React.FC<
  CardDragLayerStateTypes & CardDragPropTypes
> = (props) => {
  const { cardsOnPiles, pilesContainer, outlineDragging } = props;

  const { itemType, currentOffset, isDragging, item } = useDragLayer(
    (monitor) => ({
      itemType: monitor.getItemType(),
      item: monitor.getItem(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  if (
    currentOffset &&
    (currentOffset.x < 0 || window.innerWidth < currentOffset?.x + 115)
  ) {
    if (currentOffset?.x < 0) {
      (document.querySelector("#gameContainer") as HTMLDivElement).scrollLeft +=
        currentOffset?.x;
    } else {
      (document.querySelector("#gameContainer") as HTMLDivElement).scrollLeft +=
        currentOffset?.x + 130 - window.innerWidth;
    }
  }

  if (
    currentOffset &&
    (currentOffset.y < 0 || window.innerHeight < currentOffset?.y + 160)
  ) {
    // if (currentOffset?.x < 0) {
    //   (document.querySelector("#gameContainer") as HTMLDivElement).scrollLeft +=
    //     currentOffset?.x;
    // } else {
    //   (document.querySelector("#gameContainer") as HTMLDivElement).scrollLeft +=
    //     currentOffset?.x + 130 - window.innerWidth;
    // }
    console.log("should scroll");
  }

  const draggedCard = useMemo(
    () => `${item?.cardFront}_${item?.cardSuite}`,
    [item?.cardFront, item?.cardSuite]
  );

  const frontImage = useMemo(
    () => cardFrontsImages[draggedCard],
    [draggedCard]
  );

  const cardFromPiles = useMemo(
    () =>
      cardsOnPiles[item?.pileNumber]?.map((card) => `${card[0]}_${card[1]}`),
    [cardsOnPiles, item?.pileNumber]
  );

  const cardsToDragWhenOnPiles = cardFromPiles?.slice(
    cardFromPiles.indexOf(draggedCard)
  );

  const cardsAttributes = useMemo(
    () => cardsToDragWhenOnPiles?.map((card) => card.split("_")),
    [cardsToDragWhenOnPiles]
  );

  const draggedCardFromPileParent = (card: string[] | cardConfigType) =>
    (pilesContainer.current as HTMLDivElement).querySelector(
      `div[data-cardname="${card[0]}"][data-suite="${card[1]}"]`
    )?.parentNode;

  isDragging &&
    !outlineDragging &&
    cardsAttributes?.forEach((card) => {
      if (draggedCardFromPileParent(card)) {
        (draggedCardFromPileParent(card) as HTMLDivElement).style.opacity = "0";
      }
    });

  if (!isDragging && pilesContainer.current && !outlineDragging) {
    const cardsToBeShownAgainOnPile = Object.keys(cardsOnPiles)
      .map((pile) => cardsOnPiles[pile].filter((el) => el[2]))
      .reduce((a, b) => a.concat(b), []);

    cardsToBeShownAgainOnPile?.forEach((card) => {
      if (draggedCardFromPileParent(card)) {
        (draggedCardFromPileParent(card) as HTMLDivElement).style.opacity = "1";
      }
    });
  }

  const layerStyles: CSS.Properties = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 10000,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    display: !currentOffset ? "none" : "block",
  };

  const cardNode = (frontImageCard: string, cardIndex: number) => (
    <div
      style={{
        width: "130px",
        height: "175px",
        border: "2px solid #000000",
        borderRadius: "7px",
        backgroundImage: `url(${cardFrontsImages[frontImageCard]})`,
        backgroundColor: "white",
        backgroundSize: "cover",
        top: `${27 * cardIndex}px`,
        position: "absolute",
      }}
      key={cardIndex}
    />
  );

  const draggingCardOultine = (cardIndex = 0) => (
    <div
      style={{
        width: "130px",
        height: "175px",
        borderTop: "2px dotted #3f3f3f",
        top: `${27 * cardIndex}px`,
        position: "absolute",
      }}
    />
  );

  const rednerOutlinedCards = () =>
    cardsToDragWhenOnPiles ? (
      <div
        style={{
          position: "relative",
          borderBottom: "2px dotted #3f3f3f",
          borderLeft: "2px dotted #3f3f3f",
          borderRight: "2px dotted #3f3f3f",
          height: `${(cardsToDragWhenOnPiles.length - 1) * 25 + 175}px`,
          width: "135px",
        }}
      >
        {cardsToDragWhenOnPiles?.map((card, index) =>
          draggingCardOultine(index)
        )}
      </div>
    ) : (
      <div
        style={{
          width: "130px",
          height: "175px",
          border: "2px dotted #3f3f3f",
          position: "absolute",
        }}
      />
    );

  const renderUsualDragLayer = () =>
    cardsToDragWhenOnPiles ? (
      <div
        style={{
          position: "relative",
        }}
      >
        {cardsToDragWhenOnPiles?.map((card, index) => cardNode(card, index))}
      </div>
    ) : (
      <div
        style={{
          width: "130px",
          height: "175px",
          border: "2px solid #000000",
          borderRadius: "7px",
          backgroundImage: `url(${frontImage})`,
          backgroundColor: "white",
          backgroundSize: "cover",
        }}
      />
    );

  function renderItem() {
    switch (itemType) {
      case itemTypes.CARD:
        return outlineDragging ? rednerOutlinedCards() : renderUsualDragLayer();
      default:
        return null;
    }
  }

  return isDragging ? (
    <div style={layerStyles}>
      <div
        style={{
          position: "absolute",
          top: currentOffset?.y,
          left: currentOffset?.x,
        }}
      >
        {renderItem()}
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state: {
  cardDistribution: CardsDistributionInitialState;
}) => {
  return {
    cardsOnPiles: state.cardDistribution.cardsOnPiles,
  };
};

export const CardDragLayer = connect<
  CardDragLayerStateTypes,
  unknown,
  CardDragPropTypes
>(mapStateToProps)(CardDragLayerInternal);
