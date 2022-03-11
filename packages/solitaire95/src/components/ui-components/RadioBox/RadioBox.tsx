import React from "react";
import styles from "./RadioBox.module.scss";

type RadioBoxPropTypes = {
  label: string;
  children: React.ReactNode;
  width: number;
  heigth: number;
  underscoredLetter?: number;
};

export const RadioBox: React.FC<RadioBoxPropTypes> = ({
  label,
  children,
  width,
  heigth,
  underscoredLetter,
}) => {
  return (
    <div
      className={styles.outerBox}
      style={{ width: `${width}px`, height: `${heigth}px` }}
    >
      <span className={styles.title}>
        {label
          .split("")
          .map((letter, index) =>
            index === underscoredLetter ? (
              <span key={`${index}${letter}`}>{letter}</span>
            ) : (
              letter
            )
          )}
      </span>
      <div className={styles.innerBox}>
        <div>{children}</div>
      </div>
    </div>
  );
};
