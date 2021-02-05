import React from "react";
import { Timer, Score } from "../../smart-components";
import styles from "./BottomBar.module.scss";

type propTypes = {
  text?: string;
  score?: number;
};

const BottomBar: React.FC<propTypes> = (props) => {
  const { text, score } = props;

  return (
    <div className={styles.bottomBar__bar}>
      <div className={styles.bottomBar__text}>{text}</div>
      <div className={styles.bottomBar__stats}>
        <Score score={score} />
        <Timer />
      </div>
    </div>
  );
};

export default BottomBar;
