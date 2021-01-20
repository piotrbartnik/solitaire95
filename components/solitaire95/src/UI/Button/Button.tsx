import React from "react";
import styles from "./Button.module.scss";

type propTypes = {
  text: string;
};

const Button: React.FC<propTypes> = (props) => {
  const { text } = props;
  return (
    <div className={styles.button} tabIndex={0}>
      <div className={styles.activeBorder}>{text}</div>
    </div>
  );
};

export default Button;
