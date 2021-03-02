import React from "react";
import styles from "./Button.module.scss";

type PropTypes = {
  text: string;
  onClick?: () => void;
};

const Button: React.FC<PropTypes> = (props) => {
  const { text, onClick } = props;
  return (
    <div className={styles.button} tabIndex={0} onClick={onClick}>
      <div className={styles.activeBorder}>{text}</div>
    </div>
  );
};

export default Button;
