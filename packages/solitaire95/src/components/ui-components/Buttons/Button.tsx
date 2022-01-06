import React from "react";
import styles from "./Button.module.scss";

type ButtonPropTypes = {
  text: string | JSX.Element;
  onClick?: () => void;
  label?: string;
};

export const Button: React.FC<ButtonPropTypes> = (props) => {
  const { text, onClick, label = "" } = props;
  return (
    <div
      className={styles.button}
      tabIndex={0}
      onClick={onClick}
      role="button"
      aria-label={label}
    >
      <div className={styles.activeBorder}>{text}</div>
    </div>
  );
};
