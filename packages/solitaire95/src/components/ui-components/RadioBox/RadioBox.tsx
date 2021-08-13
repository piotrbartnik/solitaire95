import React from "react";
import styles from "./RadioBox.module.scss";

type RadioBoxPropTypes = {
  title: string;
  children: React.ReactNode;
  width: number;
  heigth: number;
};

export const RadioBox: React.FC<RadioBoxPropTypes> = (props) => {
  const { title, children, width, heigth } = props;

  return (
    <div
      className={styles.outerBox}
      style={{ width: `${width}px`, height: `${heigth}px` }}
    >
      <span className={styles.title}>{title}</span>
      <div className={styles.innerBox}>
        <div>{children}</div>
      </div>
    </div>
  );
};
