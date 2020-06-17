import React from "react";
import { TopBar, ToolBar } from "../../UI";
import { GameContainer } from "../";
import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  return (
    <div className={styles.mainPage}>
      <TopBar />
      <ToolBar />
      <GameContainer />
    </div>
  );
};

export default MainPage;
