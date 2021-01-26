import React, { useState, useEffect } from "react";
import { useDrop, useDrag, useDragLayer } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { itemTypes } from "../../configs/dragndropConfig";
import { TopBar, Button, CloseButton } from "../index";
import styles from "./SettingsWindow.module.scss";

type propTypes = {
  children?: React.ReactNode;
  windowTitle: string;
  visible: boolean;
  width?: string;
  height?: string;
  buttons?: { text: string; onClick: () => void }[];
  closeButtonAction?: () => void;
};

const CustomDragLayer = (props: any) => {
  const { size } = props;

  const { itemType, currentOffset, isDragging } = useDragLayer((monitor) => ({
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const layerStyles: any = {
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
          />
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

const SettingsWindow: React.FC<propTypes> = (props) => {
  const {
    children,
    windowTitle,
    width,
    height,
    buttons,
    visible,
    closeButtonAction,
  } = props;

  const [windowPosition, setWindowPosition] = useState([100, 100]);

  const [, drop] = useDrop({
    accept: itemTypes.WINDOW,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      setWindowPosition([
        windowPosition[0] + (delta?.y as number),
        windowPosition[1] + (delta?.x as number),
      ]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const [, drag, preview] = useDrag({
    item: {
      type: itemTypes.WINDOW,
      windowTitle: windowTitle,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  });

  return (
    <div
      className={styles.backdrop}
      style={{ display: visible ? "block" : "none" }}
      ref={drop}
    >
      <div
        className={styles.settingsWindow}
        style={{
          width: width || "450px",
          height: height || "360px",
          top: `${windowPosition[0]}px`,
          left: `${windowPosition[1]}px`,
        }}
        ref={drag}
      >
        <div className={styles.settingsWindow__inner}>
          <TopBar title={windowTitle}>
            <CloseButton onClick={closeButtonAction} />
          </TopBar>
          {children}
          <div className={styles.buttonContainer}>
            {buttons?.map((button, index) => (
              <Button text={button.text} onClick={button.onClick} key={index} />
            ))}
          </div>
        </div>
        <CustomDragLayer
          initialPosition={windowPosition}
          size={[width || "450px", height || "360px"]}
        />
      </div>
    </div>
  );
};

export default SettingsWindow;
