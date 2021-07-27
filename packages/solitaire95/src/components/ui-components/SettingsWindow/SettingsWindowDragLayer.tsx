import React from "react";
import CSS from "csstype";
import { useDragLayer } from "react-dnd";
import { itemTypes } from "../../../configs/dragndropConfig";

type SettingsWindowDragLayerPropTypes = {
  size: string[];
};

export const SettingsWindowDragLayer: React.FC<SettingsWindowDragLayerPropTypes> =
  (props) => {
    const { size } = props;

    const { itemType, currentOffset, isDragging } = useDragLayer((monitor) => ({
      itemType: monitor.getItemType(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

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
        case itemTypes.WINDOW:
          return (
            <div
              style={{
                width: size[0],
                height: size[1],
                border: "2px dotted #3f3f3f",
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
