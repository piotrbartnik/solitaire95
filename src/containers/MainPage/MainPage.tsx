import React from "react";
import TopBar from "../../UI/TopBar/TopBar";
import ToolBar from "../../UI/ToolBar/ToolBar";
import GameContainer from "../GameContainer/GameContainer";
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
