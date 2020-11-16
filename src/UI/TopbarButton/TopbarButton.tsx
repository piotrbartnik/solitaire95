import React from "react";
import styles from "./TopbarButton.module.scss";

type propTypes = {
  children: React.ReactChild;
};

const TopbarButton: React.FC<propTypes> = (props) => {
  const { children } = props;
  return (
    <div className={styles.container}>
      <span>{children}</span>
    </div>
  );
};

TopbarButton.propTypes = {};

export default TopbarButton;
