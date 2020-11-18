import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TopBar, ToolBar, BottomBar, TopbarButton } from "../../UI";
import { ToolDropdown } from "../../components";
import { GameContainer } from "../";
import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  const [gameVisible, setGameVisible] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.mainPage}>
        <TopBar />
        <ToolBar>
          <div className={styles.topBarButtonContainer}>
            <div style={{ width: "100%" }}>
              <TopbarButton
                onClick={() => {
                  setGameVisible((gameVisible) => !gameVisible);
                  setHelpVisible(false);
                }}
              >
                Game
              </TopbarButton>
              <ToolDropdown visible={gameVisible} />
            </div>
            <div style={{ width: "100%" }}>
              <TopbarButton
                onClick={() => {
                  setHelpVisible((helpVisible) => !helpVisible);
                  setGameVisible(false);
                }}
              >
                Help
              </TopbarButton>
              <ToolDropdown visible={helpVisible} />
            </div>
          </div>
        </ToolBar>
        <GameContainer />
        <BottomBar />
      </div>
    </DndProvider>
  );
};

export default MainPage;
