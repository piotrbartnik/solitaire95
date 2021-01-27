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

      const calculateWindowPosition = (
        sizeAxis: string,
        defaultAxisSize: string,
        windowPositon: number,
        differenceInPosition: number,
        windowAxis: string
      ): number => {
        const parsedWindowSize = sizeAxis
          ? parseInt(sizeAxis as string)
          : parseInt(defaultAxisSize);

        const maxPosibleAxisPosition =
          windowPositon + differenceInPosition + parsedWindowSize;

        const windowAxisPosition =
          maxPosibleAxisPosition < window[windowAxis]
            ? windowPositon + differenceInPosition
            : (window[windowAxis] as any) - parsedWindowSize;

        return windowAxisPosition > 0 ? windowAxisPosition : 0;
      };

      setWindowPosition([
        calculateWindowPosition(
          height as string,
          "360px",
          windowPosition[0],
          delta?.y as number,
          "innerHeight"
        ),
        calculateWindowPosition(
          width as string,
          "450px",
          windowPosition[1],
          delta?.x as number,
          "innerWidth"
        ),
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
