import React from "react";
import styles from "./TopbarButton.module.scss";

type propTypes = {
  children: React.ReactChild;
  onClick: () => void;
};

const TopbarButton: React.FC<propTypes> = (props) => {
  const { children, onClick } = props;
  return (
    <div className={styles.container} onClick={onClick}>
      <span>{children}</span>
    </div>
  );
};

TopbarButton.propTypes = {};

export default TopbarButton;
