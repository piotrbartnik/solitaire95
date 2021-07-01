import React from "react";
import CSS from "csstype";
import { useDragLayer } from "react-dnd";
import { itemTypes } from "../../../configs/dragndropConfig";
import { cardFrontsImages } from "../../../static/cardsFronts";

export const CardDragLayer: React.FC = () => {
  const { itemType, currentOffset, isDragging, item } = useDragLayer(
    (monitor) => ({
      itemType: monitor.getItemType(),
      item: monitor.getItem(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  const frontImage: string =
    cardFrontsImages[`${item?.cardFront}_${item?.cardSuite}`];

  const layerStyles: CSS.Properties = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 1,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    display: !currentOffset ? "none" : "block",
  };

  function renderItem() {
    switch (itemType) {
      case itemTypes.CARD:
        return (
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
