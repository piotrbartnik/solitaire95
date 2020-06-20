import React from "react";
import { Timer, Score } from "../../components";
import styles from "./BottomBar.module.scss";

const BottomBart: React.FC = () => {
  return (
    <div className={styles.bottomBar__bar}>
      <Score />
      <Timer />
    </div>
  );
};

export default BottomBart;
