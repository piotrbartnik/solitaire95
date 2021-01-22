import React from "react";
import { displayPartsToString } from "typescript";
import { TopBar, Button } from "../index";
import styles from "./SettingsWindow.module.scss";

type propTypes = {
  children?: React.ReactNode;
  windowTitle: string;
  visible: boolean;
  width?: string;
  height?: string;
  buttons?: { text: string; onClick: () => void }[];
};

const SettingsWindow: React.FC<propTypes> = (props) => {
  const { children, windowTitle, width, height, buttons, visible } = props;
  return (
    <div
      className={styles.settingsWindow}
      style={{
        width: width || "450px",
        height: height || "360px",
        display: visible ? "block" : "none",
      }}
    >
      <div className={styles.settingsWindow__inner}>
        <TopBar title={windowTitle} />
        {children}
        <div className={styles.buttonContainer}>
          {buttons?.map((button) => (
            <Button text={button.text} onClick={button.onClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsWindow;
