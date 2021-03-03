import React from "react";
import { Timer, Score } from "../../smart-components";
import styles from "./BottomBar.module.scss";

type PropTypes = {
  text?: string;
  score?: number;
};

export const BottomBar: React.FC<PropTypes> = (props) => {
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
