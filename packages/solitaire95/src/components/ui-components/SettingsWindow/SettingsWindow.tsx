import React, { useState, useEffect, useContext } from "react";
import { useDrop, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Howl } from "howler";
import ding from "../../../static/misc/ding.mp3";
import { CardBackContext } from "../../game-containers";
import { itemTypes } from "../../../configs/dragndropConfig";
import { TopBar, Button, CloseButton } from "../index";
import { SettingsWindowDragLayer } from "./SettingsWindowDragLayer";
import styles from "./SettingsWindow.module.scss";

type PropTypes = {
  children?: React.ReactNode;
  windowTitle: string;
  visible: boolean;
  width?: string;
  height?: string;
  buttons?: { text: string; onClick: () => void }[];
  closeButtonAction?: () => void;
};

export const SettingsWindow: React.FC<PropTypes> = (props) => {
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

  const { playSounds } = useContext(CardBackContext);

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
            : (window[windowAxis] as number) - parsedWindowSize;

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

  const windowError = playSounds
    ? new Howl({
        src: [ding],
        format: ["mp3"],
      })
    : undefined;

  const playSoundOnClick = (el: React.MouseEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const backDropdClass = [...(el.target as any).classList].filter((el) =>
      el.match(/backdrop/)
    );

    if (backDropdClass.length) {
      windowError?.play();
    }
  };

  return (
    <div
      className={styles.backdrop}
      style={{ display: visible ? "block" : "none" }}
      ref={drop}
      onClick={playSounds ? playSoundOnClick : undefined}
    >
      <div
        className={styles.settingsWindow}
        style={{
          width: width || "450px",
          height: height || "360px",
          top: `${windowPosition[0]}px`,
          left: `${windowPosition[1]}px`,
        }}
      >
        <div className={styles.settingsWindow__inner}>
          <TopBar title={windowTitle} dragRef={drag}>
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
