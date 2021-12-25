import React from "react";
import styles from "./Score.module.scss";

type PropTypes = {
  score?: number;
  isVegas?: boolean;
};

export const Score: React.FC<PropTypes> = (props) => {
  const { score, isVegas } = props;
  return (
    <div>
      Score:{" "}
      {isVegas ? <span className={styles.vegasScore}>{score}</span> : score}
    </div>
  );
};
