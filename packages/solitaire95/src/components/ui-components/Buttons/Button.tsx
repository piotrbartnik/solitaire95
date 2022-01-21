import React, { useState } from "react";
import styles from "./Button.module.scss";

type ButtonPropTypes = {
  text: string | JSX.Element;
  onClick?: () => void;
  label?: string;
};

export const Button: React.FC<ButtonPropTypes> = (props) => {
  const { text, onClick, label = "" } = props;
  const [buttonActive, setButtonActive] = useState(false);
  return (
    <div
      className={[styles.button, buttonActive && styles["button--active"]].join(
        " "
      )}
      tabIndex={0}
      onMouseDown={() => {
        setButtonActive(true);
      }}
      role="button"
      aria-label={label}
      onMouseUp={() => {
        setButtonActive(false);
        setTimeout(() => onClick?.(), 50);
      }}
    >
      <div className={buttonActive && styles.activeBorder}>{text}</div>
    </div>
  );
};
