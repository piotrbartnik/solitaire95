import React from "react";
import styles from "./TopbarButton.module.scss";

type propTypes = {
  buttonText: string;
  onClick: () => void;
};

const TopbarButton: React.FC<propTypes> = (props) => {
  const { buttonText, onClick } = props;
  return (
    <div className={styles.container} onClick={onClick}>
      <span>{buttonText}</span>
    </div>
  );
};

TopbarButton.propTypes = {};

export default TopbarButton;
