import React from "react";
import { Timer } from "../../smart-components";
import { Score } from "../../ui-components";
import styles from "./BottomBar.module.scss";

type BottomBarPropTypes = {
  text?: string;
  score?: number;
  bottomBarVisible?: boolean;
  timerVisible?: boolean;
  scoreVisible?: boolean;
};

export const BottomBar: React.FC<BottomBarPropTypes> = (props) => {
  const { text, score, bottomBarVisible, timerVisible, scoreVisible } = props;

  return (
    <div
      className={[
        styles.bottomBar__bar,
        !bottomBarVisible ? styles.disabled : null,
      ].join(" ")}
    >
      {bottomBarVisible ? (
        <>
          <div className={styles.bottomBar__text}>{text}</div>
          <div className={styles.bottomBar__stats}>
            {scoreVisible && <Score score={score} />}
            {timerVisible && <Timer />}
          </div>
        </>
      ) : null}
    </div>
  );
};
