import React, { useState, createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { connect } from "react-redux";
import { WindowsState, Points } from "../../../store/reducers/";
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

export const CardBackContext = createContext({
  cardBackImage: "acorns",
  setCardBackImage: (cardBackName: string) => cardBackName,
  playSounds: true,
});

type MainPageStateTypes = {
  isWindowVisible?: WindowsState;
  score?: number;
};

type MainPagePropTypes = {
  playSounds?: boolean;
  aboutChildren?: JSX.Element;
};

const MainPageInternal: React.FC<MainPageStateTypes & MainPagePropTypes> = (
  props
) => {
  const { isWindowVisible, playSounds, score, aboutChildren } = props;
  const [cardBackImage, setCardBackImage] = useState("acorns");
  const value: {
    cardBackImage: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setCardBackImage: any;
    playSounds: boolean;
  } = {
    cardBackImage,
    setCardBackImage,
    playSounds: playSounds || false,
  };

  const [gameVisible, setGameVisible] = useState<boolean>(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const [bottomBarText, setBottomBarText] = useState("");

  const dndProviderBackend = /Mobi|Android/i.test(navigator.userAgent)
    ? TouchBackend
    : HTML5Backend;

  return (
    <DndProvider backend={dndProviderBackend}>
      <div
        className={styles.mainPage}
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
        <CardBackContext.Provider value={value}>
          {isWindowVisible?.cardBackWindow ? <DeckSelect /> : null}
          {isWindowVisible?.aboutWindow ? (
            <AboutSolitaire aboutChildren={aboutChildren} />
          ) : null}
          {isWindowVisible?.optionsWindow ? <Options /> : null}
          <DealAgain />
          <TopBar
            title={"Solitaire"}
            showIcon
            shouldBeGreyedOut={Object.values(
              isWindowVisible as WindowsState
            ).some((window) => window === true)}
          />
          <AppToolbar
            gameVisible={gameVisible}
            setGameVisible={setGameVisible}
            helpVisible={helpVisible}
            setHelpVisible={setHelpVisible}
            setBottomBarText={setBottomBarText}
          />
          <GameContainer />
          <BottomBar text={bottomBarText} score={score} />
        </CardBackContext.Provider>
      </div>
    </DndProvider>
  );
};

const mapStateToProps = (state: {
  toggleWindows: WindowsState;
  countScore: Points;
}) => {
  return {
    isWindowVisible: state.toggleWindows,
    score: state.countScore.points,
  };
};

export const MainPage = connect<
  MainPageStateTypes,
  undefined,
  MainPagePropTypes
>(
  mapStateToProps,
  undefined
)(MainPageInternal);
