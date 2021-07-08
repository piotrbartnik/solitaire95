import React from "react";
import CSS from "csstype";
import { useDragLayer } from "react-dnd";
import { connect } from "react-redux";
import { CardsDistributionInitialState } from "../../../store/reducers/";
import { itemTypes } from "../../../configs/dragndropConfig";
import { cardFrontsImages } from "../../../static/cardsFronts";
import { cardConfigType } from "../../../configs/cardTypes";

type CardDgarPropTypes = {
  pilesContainer: any;
};

type CardDragLayerStateTypes = {
  cardsOnPiles: { [key: string]: cardConfigType[] };
};

const CardDragLayerInternal: React.FC<
  CardDragLayerStateTypes & CardDgarPropTypes
> = (props) => {
  const { cardsOnPiles, pilesContainer } = props;
  const { itemType, currentOffset, isDragging, item } = useDragLayer(
    (monitor) => ({
      itemType: monitor.getItemType(),
      item: monitor.getItem(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  const draggedCard = `${item?.cardFront}_${item?.cardSuite}`;
  const frontImage: string = cardFrontsImages[draggedCard];

  const cardFromPiles = cardsOnPiles[item?.pileNumber]?.map(
    (card) => `${card[0]}_${card[1]}`
  );

  const cardsToDragWhenOnPiles = cardFromPiles?.slice(
    cardFromPiles.indexOf(draggedCard)
  );

  const cardsAttributes = cardsToDragWhenOnPiles?.map((card) =>
    card.split("_")
  );

  isDragging
    ? cardsAttributes?.forEach(
        (card) =>
          (pilesContainer.current.querySelector(
            `div[data-cardname="${card[0]}"][data-suite="${card[1]}"]`
          ).parentNode.style.opacity = "0")
      )
    : cardFromPiles
        ?.map((el) => el.split("_"))
        ?.forEach(
          (card) =>
            (pilesContainer.current.querySelector(
              `div[data-cardname="${card[0]}"][data-suite="${card[1]}"]`
            ).parentNode.style.opacity = "1")
        );

  if (!isDragging) {
    console.log(cardsOnPiles);
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
    ></div>
  );

  function renderItem() {
    switch (itemType) {
      case itemTypes.CARD:
        return cardsToDragWhenOnPiles ? (
          <div style={{ position: "relative" }}>
            {cardsToDragWhenOnPiles?.map((card, index) =>
              cardNode(card, index)
            )}
          </div>
        ) : (
          <>
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
            ></div>
          </>
        );
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }
  return (
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
  );
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
  CardDgarPropTypes
>(mapStateToProps)(CardDragLayerInternal);
