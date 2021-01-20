import React from "react";
import styles from "./SettingsWindow.module.scss";

type propTypes = {
  children?: React.ReactNode;
};

const SettingsWindow: React.FC<propTypes> = (props) => {
  const { children } = props;
  return <div className={styles.window}>{children}</div>;
};

export default SettingsWindow;
