import React from "react";
import { TopBar, Button } from "../index";
import styles from "./SettingsWindow.module.scss";

type propTypes = {
  children?: React.ReactNode;
};

const SettingsWindow: React.FC<propTypes> = (props) => {
  const { children } = props;
  return (
    <div className={styles.settingsWindow}>
      <div className={styles.settingsWindow__inner}>
        <TopBar title={"Select Card Back"} />
        {children}
        <div className={styles.buttonContainer}>
          <Button text="OK" />
          <Button text="Cancel" />
        </div>
      </div>
    </div>
  );
};

export default SettingsWindow;
