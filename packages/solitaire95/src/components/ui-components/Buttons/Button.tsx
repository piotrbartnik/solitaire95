import React from "react";
import styles from "./Button.module.scss";

type ButtonPropTypes = {
  text: string;
  onClick?: () => void;
};

export const Button: React.FC<ButtonPropTypes> = (props) => {
  const { text, onClick } = props;
  return (
    <div className={styles.button} tabIndex={0} onClick={onClick} role="button">
      <div className={styles.activeBorder}>{text}</div>
    </div>
  );
};
