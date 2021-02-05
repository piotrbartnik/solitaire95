import React from "react";
import styles from "./Button.module.scss";

type propTypes = {
  text: string;
  onClick?: () => void;
};

const Button: React.FC<propTypes> = (props) => {
  const { text, onClick } = props;
  return (
    <div className={styles.button} tabIndex={0} onClick={onClick}>
      <div className={styles.activeBorder}>{text}</div>
    </div>
  );
};

export default Button;
