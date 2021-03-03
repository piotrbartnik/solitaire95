import React from "react";
import styles from "./TopbarButton.module.scss";

type PropTypes = {
  buttonText: string;
  onClick: () => void;
};

export const TopbarButton: React.FC<PropTypes> = (props) => {
  const { buttonText, onClick } = props;
  return (
    <div className={styles.container} onClick={onClick}>
      <span>{buttonText}</span>
    </div>
  );
};
