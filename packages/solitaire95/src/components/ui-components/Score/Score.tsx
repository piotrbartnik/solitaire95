import React from "react";
import styles from "./Score.module.scss";

type PropTypes = {
  score?: number;
  isVegas?: boolean;
};

export const Score: React.FC<PropTypes> = (props) => {
  const { score = 0, isVegas } = props;

  const vegasDollarsScore = score >= 0 ? `$${score}` : `-$${Math.abs(score)}`;

  return (
    <div>
      Score:{" "}
      {isVegas ? (
        <span className={score < 0 ? styles.vegasScore : undefined}>
          {vegasDollarsScore}
        </span>
      ) : (
        score
      )}
    </div>
  );
};
