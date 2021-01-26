import React, { useState, useEffect } from "react";
import { useDrop, useDrag, useDragLayer } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { itemTypes } from "../../configs/dragndropConfig";
import { TopBar, Button, CloseButton } from "../index";
import { SettingsWindowDragLayer } from "./SettingsWindowDragLayer";
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
        <SettingsWindowDragLayer size={[width || "450px", height || "360px"]} />
      </div>
    </div>
  );
};

export default SettingsWindow;
