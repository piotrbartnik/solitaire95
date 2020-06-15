import React from "react";
import TopBar from "../../UI/TopBar/TopBar";
import card from "./card.png";
import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  return (
    <div className={styles.mainPage}>
      <TopBar />
      <img src={card} alt="dummy card" />
    </div>
  );
};

export default MainPage;
