import React, { useState, createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { connect } from "react-redux";
import { TopBar, BottomBar } from "../../UI";
import { DeckSelect } from "../../components";
import { GameContainer } from "../";
import AppToolbar from "../AppToolbar/AppToolbar";
import styles from "./MainPage.module.scss";

export const CardBackContext = createContext({
  cardBackImage: "acorns",
  setCardBackImage: (cardBackName: string) => cardBackName,
  playSounds: true,
});

type propTypes = {
  isWindowVisible?: boolean;
  playSounds?: boolean;
  score?: number;
};

const MainPage: React.FC<propTypes> = (props) => {
  const { isWindowVisible, playSounds, score } = props;
  const [cardBackImage, setCardBackImage] = useState("acorns");
  const value: {
    cardBackImage: string;
    setCardBackImage: any;
    playSounds: boolean;
  } = {
    cardBackImage,
    setCardBackImage,
    playSounds: playSounds || false,
  };

  const [gameVisible, setGameVisible] = useState(false);
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
          const eventTarget = e.target as any;
          const disabledButton = [
            ...eventTarget.offsetParent.classList,
          ].filter((el) => el.match("dropdownContainer")).length;
          if (gameVisible && !disabledButton) {
            setGameVisible(false);
          }
          if (helpVisible && !disabledButton) {
            setHelpVisible(false);
          }
        }}
      >
        <CardBackContext.Provider value={value}>
          <DeckSelect />
          <TopBar
            title={"Solitaire"}
            showIcon
            shouldBeGreyedOut={isWindowVisible}
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

const mapStateToProps = (state: any) => {
  return {
    isWindowVisible: state.toggleWindows.cardBackWindowState,
    score: state.countScore.points,
  };
};

export default connect(mapStateToProps, undefined)(MainPage);
