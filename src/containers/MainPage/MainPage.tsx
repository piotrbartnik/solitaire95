import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TopBar, ToolBar, BottomBar } from "../../UI";
import { GameContainer } from "../";
import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  return (
    <div className={styles.mainPage}>
      <TopBar />
      <ToolBar />
      <DndProvider backend={HTML5Backend}>
        <GameContainer />
      </DndProvider>
      <BottomBar />
    </div>
  );
};

export default MainPage;
