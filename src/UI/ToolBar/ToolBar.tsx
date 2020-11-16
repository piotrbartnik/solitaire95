import React from "react";
import styles from "./ToolBar.module.scss";

type propTypes = {
  children: React.ReactNode;
};

const ToolBar: React.FC<propTypes> = (props) => {
  const { children } = props;
  return <div className={styles.toolBar__bar}>{children}</div>;
};

export default ToolBar;
