import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TopBar, ToolBar, BottomBar, TopbarButton } from "../../UI";
import { GameContainer } from "../";
import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.mainPage}>
        <TopBar />
        <ToolBar>
          <div className={styles.topBarButtonContainer}>
            <TopbarButton onClick={() => console.log("test1")}>
              Game
            </TopbarButton>
            <TopbarButton onClick={() => console.log("test2")}>
              Help
            </TopbarButton>
          </div>
        </ToolBar>
        <GameContainer />
        <BottomBar />
      </div>
    </DndProvider>
  );
};

export default MainPage;
