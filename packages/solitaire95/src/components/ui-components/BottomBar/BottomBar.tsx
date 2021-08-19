import React from "react";
import { Timer, Score } from "../../smart-components";
import styles from "./BottomBar.module.scss";

type BottomBarPropTypes = {
  text?: string;
  score?: number;
  bottomBarVisible?: boolean;
};

export const BottomBar: React.FC<BottomBarPropTypes> = (props) => {
  const { text, score, bottomBarVisible } = props;

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
            <Timer />
          </div>
        </>
      ) : null}
    </div>
  );
};
