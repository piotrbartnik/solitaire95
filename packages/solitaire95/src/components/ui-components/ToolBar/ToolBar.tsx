import React from "react";
import styles from "./ToolBar.module.scss";

type PropTypes = {
  children: React.ReactNode;
};

export const ToolBar: React.FC<PropTypes> = (props) => {
  const { children } = props;
  return <div className={styles.toolBar__bar}>{children}</div>;
};
