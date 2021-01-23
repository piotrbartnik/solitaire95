import React from "react";
import { Timer, Score } from "../../components";
import styles from "./BottomBar.module.scss";

const BottomBart: React.FC = () => {
  return (
    <div className={styles.bottomBar__bar}>
      <div className={styles.bottomBar__text}>Some text will go here</div>
      <div className={styles.bottomBar__stats}>
        <Score />
        <Timer />
      </div>
    </div>
  );
};

export default BottomBart;
