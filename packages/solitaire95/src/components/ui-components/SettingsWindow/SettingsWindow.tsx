import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useDrop, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Howl } from "howler";
import ding from "../../../static/misc/ding.mp3";
import { CardBackContext } from "../../game-containers";
import { itemTypes } from "../../../configs/dragndropConfig";
import { TopBar, Button, CloseButton } from "../index";
import { SettingsWindowDragLayer } from "./SettingsWindowDragLayer";
import styles from "./SettingsWindow.module.scss";

type SettingWindowPropTypes = {
  children?: React.ReactNode;
  windowTitle: string;
  visible: boolean;
  width?: number;
  height?: number;
  buttons?: { text: string; onClick: () => void }[];
  closeButtonAction?: () => void;
  positionOnWindow?: number[];
};

export const SettingsWindow: React.FC<SettingWindowPropTypes> = (props) => {
  const {
    children,
    windowTitle,
    width,
    height,
    buttons,
    visible,
    closeButtonAction,
    positionOnWindow,
  } = props;

  const [windowPosition, setWindowPosition] = useState([
    positionOnWindow?.[0] || 100,
    positionOnWindow?.[1] || 100,
  ]);
  const [maxWindowWidth, setMaxWindowWidth] = useState(width || 450);

  const { playSounds } = useContext(CardBackContext);

  const [, drop] = useDrop({
    accept: itemTypes.WINDOW,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();

      const calculateWindowPosition = (
        sizeAxis: number,
        defaultAxisSize: number,
        windowPositon: number,
        differenceInPosition: number,
        windowAxis: string
      ): number => {
        const parsedWindowSize = sizeAxis ? sizeAxis : defaultAxisSize;

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
          height as number,
          360,
          windowPosition[0],
          delta?.y as number,
          "innerHeight"
        ),
        calculateWindowPosition(
          width as number,
          450,
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

  const windowError = useMemo(
    () =>
      playSounds
        ? new Howl({
            src: [ding],
            format: ["mp3"],
          })
        : undefined,
    [playSounds]
  );

  const playSoundOnClick = useCallback(
    (el: React.MouseEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backDropdClass = [...(el.target as any).classList].filter((el) =>
        el.match(/backdrop/)
      );

      if (backDropdClass.length) {
        windowError?.play();
      }
    },
    [windowError]
  );

  useEffect(() => {
    const gameContainerWidth = document
      .querySelector("#gameContainer")
      ?.getBoundingClientRect().width as number;

    if (gameContainerWidth < (width as number)) {
      setWindowPosition([80, 0]);
      setMaxWindowWidth(gameContainerWidth - 20);
    }
  }, [width]);

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
          width: width ? `${width}px` : "450px",
          height: height ? `${height}px` : "360px",
          top: `${windowPosition[0]}px`,
          left: `${windowPosition[1]}px`,
          maxWidth: `${maxWindowWidth}px`,
        }}
      >
        <TopBar title={windowTitle} dragRef={drag}>
          <CloseButton onClick={closeButtonAction} />
        </TopBar>
        <div
          style={{
            height: "calc(100% - 30px)",
            top: `${windowPosition[0]}px`,
            left: `${windowPosition[1]}px`,
            overflow: "auto",
            maxWidth: `${maxWindowWidth}px`,
          }}
        >
          <div
            className={styles.settingsWindow__inner}
            style={{ width: `${(width as number) - 4}px` || "450px" }}
          >
            {children}
            <div className={styles.buttonContainer}>
              {buttons?.map((button, index) => (
                <Button
                  text={button.text}
                  onClick={button.onClick}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <SettingsWindowDragLayer
        size={[
          width ? `${width}px` : "450px",
          height ? `${height}px` : "360px",
        ]}
        maxWindowWidth={maxWindowWidth}
      />
    </div>
  );
};
