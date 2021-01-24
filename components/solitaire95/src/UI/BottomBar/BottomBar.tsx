import React from "react";
import { Timer, Score } from "../../components";
import styles from "./BottomBar.module.scss";

type propTypes = {
  text?: string;
};

const BottomBart: React.FC<propTypes> = (props) => {
  const { text } = props;

  return (
    <div className={styles.bottomBar__bar}>
      <div className={styles.bottomBar__text}>{text}</div>
      <div className={styles.bottomBar__stats}>
        <Score />
        <Timer />
      </div>
    </div>
  );
};

export default BottomBart;
