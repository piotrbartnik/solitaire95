import React, { useState, createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { TopBar, BottomBar } from "../../UI";
import { DeckSelect } from "../../components";
import { GameContainer } from "../";
import AppToolbar from "../AppToolbar/AppToolbar";
import styles from "./MainPage.module.scss";

export const CardBackContext = createContext({
  cardBackImage: "acorns",
  setCardBackImage: (cardBackName: string) => cardBackName,
});

const MainPage: React.FC = () => {
  const [cardBackImage, setCardBackImage] = useState("acorns");
  const value: { cardBackImage: string; setCardBackImage: any } = {
    cardBackImage,
    setCardBackImage,
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
        onClick={() => {
          if (gameVisible) {
            setGameVisible(false);
          }
          if (helpVisible) {
            setHelpVisible(false);
          }
        }}
      >
        <CardBackContext.Provider value={value}>
          <DeckSelect />
          <TopBar title={"Solitaire"} showIcon />
          <AppToolbar
            gameVisible={gameVisible}
            setGameVisible={setGameVisible}
            helpVisible={helpVisible}
            setHelpVisible={setHelpVisible}
            setBottomBarText={setBottomBarText}
          />
          <GameContainer />
          <BottomBar text={bottomBarText} />
        </CardBackContext.Provider>
      </div>
    </DndProvider>
  );
};

export default MainPage;
