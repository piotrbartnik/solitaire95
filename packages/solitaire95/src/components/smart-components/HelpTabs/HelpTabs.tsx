import React from "react";
import styles from "./HelpTabs.module.scss";

type PilePropTypes = {
  children?: JSX.Element;
};

export const HelpTabs: React.FC<PilePropTypes> = ({
  children = "Tab here",
}) => {
  console.log(children);
  return (
    <div className={styles.contentContainer}>
      <div className={styles.contentContainer__inner}></div>
    </div>
  );
};
