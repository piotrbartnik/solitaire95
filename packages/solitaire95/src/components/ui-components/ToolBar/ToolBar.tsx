import React from "react";
import styles from "./ToolBar.module.scss";

type ToolBarPropTypes = {
  children: React.ReactNode;
};

export const ToolBar: React.FC<ToolBarPropTypes> = (props) => {
  const { children } = props;
  return <div className={styles.toolBar__bar}>{children}</div>;
};
