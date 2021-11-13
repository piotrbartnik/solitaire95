import React from "react";
import { Timer } from "../../smart-components";
import { Score } from "../../ui-components";
import styles from "./BottomBar.module.scss";

type BottomBarPropTypes = {
  text?: string;
  score?: number;
  bottomBarVisible?: boolean;
  timerVisible?: boolean;
};

export const BottomBar: React.FC<BottomBarPropTypes> = (props) => {
  const { text, score, bottomBarVisible, timerVisible } = props;

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
            <Score score={score} />
            {timerVisible && <Timer />}
          </div>
        </>
      ) : null}
    </div>
  );
};
