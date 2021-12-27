import React, {
  useState,
  createContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { connect } from "react-redux";
import {
  toggleWindow,
  stopGame,
  countScore,
  finishGame,
} from "../../../store/actions/";
import {
  ToggleWindowType,
  StopGameType,
  FinishGameType,
  CountScoreType,
} from "../../../store/actions/actionTypes";
import {
  WindowsState,
  Points,
  FoundationInitialState,
  FoundationState,
  GameState,
} from "../../../store/reducers/";
import { TopBar, BottomBar } from "../../ui-components";
import {
  DeckSelect,
  AboutSolitaire,
  Options,
  DealAgain,
} from "../../smart-components";
import { GameContainer } from "../";
import { AppToolbar } from "../AppToolbar/AppToolbar";
import styles from "./MainPage.module.scss";

export const SoundContext = createContext({ playSounds: true });
export const VegasContext = createContext({
  isVegas: true,
  keepVegasScore: false,
});

type SoundContextType = {
  playSounds: boolean;
};

type MainPageDispatchTypes = {
  toggleDealWindow: ToggleWindowType;
  stopGame: StopGameType;
  addPointsOnEnd: CountScoreType;
  setGameFinished: FinishGameType;
};

type MainPageStateTypes = {
  isWindowVisible?: WindowsState;
  score?: number;
  cardsOnFoundations: FoundationInitialState;
  scoreTime: number;
  bottomBarVisible: boolean;
  timerVisible: boolean;
  scoreVisible: boolean;
  scoreType: string;
  vegasScore: number;
  keepVegasScore: boolean;
};

type MainPagePropTypes = Partial<SoundContextType> & {
  aboutChildren?: JSX.Element;
};

const MainPageInternal: React.FC<
  MainPageStateTypes & MainPagePropTypes & MainPageDispatchTypes
> = (props) => {
  const {
    isWindowVisible,
    playSounds,
    score,
    aboutChildren,
    cardsOnFoundations,
    stopGame,
    addPointsOnEnd,
    setGameFinished,
    scoreTime,
    bottomBarVisible,
    timerVisible,
    scoreVisible,
    scoreType,
    vegasScore,
    keepVegasScore,
  } = props;

  const soundContextValue: SoundContextType = {
    playSounds: playSounds || false,
  };

  const isVegas = scoreType === "vegas";

  const vegasContext: { isVegas: boolean; keepVegasScore: boolean } = {
    isVegas,
    keepVegasScore,
  };

  const [gameVisible, setGameVisible] = useState<boolean>(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const [bottomBarText, setBottomBarText] = useState("");
  const [canvasSize, setCanvasSize] = useState<number[]>([]);

  const setBottomBarTextCallback = useCallback(
    (text) => setBottomBarText(text),
    []
  );
  const setGameVisibleCallback = useCallback(
    (gameVisible) => setGameVisible(gameVisible),
    []
  );
  const setHelpVisibleCallback = useCallback(
    (helpVisible) => setHelpVisible(helpVisible),
    []
  );

  const mainPageRef = useRef<HTMLDivElement>(null);

  const isGameEnded = useCallback(() => {
    const cards = Object.values(cardsOnFoundations);
    const testCard = cards.map((el: FoundationState) => el?.cards);
    const allCards = testCard?.reduce((acc, val) => acc.concat(val), []);

    if (allCards.length === 52) {
      stopGame();
      setTimeout(() => setGameFinished(true), 1000);
      setCanvasSize([
        mainPageRef.current
          ?.querySelector("#gameContainer")
          ?.getBoundingClientRect().width as number,
        mainPageRef.current
          ?.querySelector("#gameContainer")
          ?.getBoundingClientRect().height as number,
      ]);
      if (scoreTime > 30) {
        const pointsToAddOnEnd = Math.round((20000 / scoreTime) * 35);
        addPointsOnEnd(pointsToAddOnEnd);
      }
    }
  }, [
    cardsOnFoundations,
    stopGame,
    addPointsOnEnd,
    setGameFinished,
    scoreTime,
  ]);

  useEffect(() => isGameEnded(), [cardsOnFoundations, isGameEnded]);

  const dndProviderBackend = /Mobi|Android/i.test(navigator.userAgent)
    ? TouchBackend
    : HTML5Backend;

  return (
    <DndProvider backend={dndProviderBackend}>
      <div
        className={styles.mainPage}
        ref={mainPageRef}
        onClick={(e) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const eventTarget = e.target as any;
          const classListOfParent = eventTarget.offsetParent?.classList;
          const disabledButton = classListOfParent
            ? [...eventTarget?.offsetParent?.classList].filter((el) =>
                el.match("dropdownContainer")
              ).length
            : undefined;
          if (gameVisible && !disabledButton) {
            setGameVisible(false);
          }
          if (helpVisible && !disabledButton) {
            setHelpVisible(false);
          }
        }}
      >
        <SoundContext.Provider value={soundContextValue}>
          <VegasContext.Provider value={vegasContext}>
            {isWindowVisible?.cardBackWindow && <DeckSelect />}
            {isWindowVisible?.aboutWindow && (
              <AboutSolitaire aboutChildren={aboutChildren} />
            )}
            {isWindowVisible?.optionsWindow && <Options />}
            {isWindowVisible?.dealAgainWindow && <DealAgain />}
            <TopBar
              title={"Solitaire"}
              showIcon
              shouldBeGreyedOut={Object.values(
                isWindowVisible as WindowsState
              ).some((window) => window === true)}
            />
            <AppToolbar
              gameVisible={gameVisible}
              helpVisible={helpVisible}
              setGameVisible={setGameVisibleCallback}
              setHelpVisible={setHelpVisibleCallback}
              setBottomBarText={setBottomBarTextCallback}
            />
            <GameContainer
              canvasHeight={canvasSize[1]}
              canvasWidth={canvasSize[0]}
            />
            <BottomBar
              text={bottomBarText}
              score={isVegas ? vegasScore : score}
              bottomBarVisible={bottomBarVisible}
              timerVisible={timerVisible}
              scoreVisible={scoreVisible}
              isVegas={isVegas}
            />
          </VegasContext.Provider>
        </SoundContext.Provider>
      </div>
    </DndProvider>
  );
};

const mapDispatchToProps = {
  toggleDealWindow: toggleWindow,
  stopGame,
  addPointsOnEnd: countScore,
  setGameFinished: finishGame,
};

const mapStateToProps = (state: {
  toggleWindows: WindowsState;
  countScore: Points;
  cardsOnFoundation: FoundationInitialState;
  timeCounter: { scoreTime: number };
  gameState: GameState;
}) => {
  return {
    isWindowVisible: state.toggleWindows,
    score: state.countScore.points,
    cardsOnFoundations: state.cardsOnFoundation,
    scoreTime: state.timeCounter.scoreTime,
    bottomBarVisible: state.gameState.bottomBarVisible,
    timerVisible: state.gameState.timerVisible,
    scoreVisible: state.gameState.scoreVisible,
    scoreType: state.gameState.scoreType,
    vegasScore: state.countScore.dollars,
    keepVegasScore: state.gameState.keepVegasScore,
  };
};

export const MainPage = connect<
  MainPageStateTypes,
  MainPageDispatchTypes,
  MainPagePropTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(MainPageInternal);
