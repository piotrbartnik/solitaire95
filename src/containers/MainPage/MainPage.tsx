import React from "react";
import { TopBar, ToolBar, BottomBar } from "../../UI";
import { GameContainer } from "../";
import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  return (
    <div className={styles.mainPage}>
      <TopBar />
      <ToolBar />
      <GameContainer />
      <BottomBar />
    </div>
  );
};

export default MainPage;
