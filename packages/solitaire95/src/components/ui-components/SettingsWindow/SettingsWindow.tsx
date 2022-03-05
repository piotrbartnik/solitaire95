import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useDrop, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Howl } from "howler";
import ding from "../../../static/misc/ding.mp3";
import { SoundContext } from "../../game-containers";
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
  buttons?: {
    text: string;
    onClick: () => void;
    underscoredLetter?: number;
    disabled?: boolean;
  }[];
  closeButtonAction?: () => void;
  positionOnWindow?: number[];
  topBarIcon?: string;
  iconHeight?: string;
  topBarGreyetOut?: boolean;
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
    topBarIcon,
    iconHeight,
    topBarGreyetOut,
  } = props;

  const [windowPosition, setWindowPosition] = useState([
    positionOnWindow?.[0] || 100,
    positionOnWindow?.[1] || 100,
  ]);
  const [maxWindowWidth, setMaxWindowWidth] = useState(width || 450);
  const [calculatedHeight, setCalulatedWindowHeight] = useState<number>();

  const { playSounds } = useContext(SoundContext);

  const settingWindowRef = useRef(null);

  useEffect(() => {
    const windowRef = settingWindowRef.current;
    if (windowRef && !height) {
      const sizesOfWindow = (
        windowRef as HTMLDivElement
      ).getBoundingClientRect();
      const heightCalculated = sizesOfWindow.bottom - sizesOfWindow.top;
      setCalulatedWindowHeight(heightCalculated);
    }
  }, [height]);

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
          (height as number) || (calculatedHeight as number),
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

  const [{ item }, drag, preview] = useDrag({
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

  const shouldCreateDragLayer = useMemo(
    () => windowTitle === item?.windowTitle,
    [item?.windowTitle, windowTitle]
  );

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
          height: height ? `${height}px` : undefined,
          top: `${windowPosition[0]}px`,
          left: `${windowPosition[1]}px`,
          maxWidth: `${maxWindowWidth}px`,
        }}
        role="dialog"
        aria-label={windowTitle}
        ref={settingWindowRef}
      >
        <TopBar
          title={windowTitle}
          dragRef={drag}
          icon={topBarIcon}
          showIcon={!!topBarIcon}
          iconHeight={iconHeight}
          shouldBeGreyedOut={topBarGreyetOut}
        >
          <CloseButton onClick={closeButtonAction} ariaLabel={windowTitle} />
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
              {buttons?.map(
                ({ text, onClick, underscoredLetter, disabled }, index) => (
                  <Button
                    text={text}
                    onClick={onClick}
                    key={index}
                    underscoredLetter={underscoredLetter}
                    disabled={disabled}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {shouldCreateDragLayer && (
        <SettingsWindowDragLayer
          size={[
            width ? `${width}px` : "450px",
            height ? `${height}px` : `${calculatedHeight}px`,
          ]}
          maxWindowWidth={maxWindowWidth}
          key={windowTitle}
        />
      )}
    </div>
  );
};
