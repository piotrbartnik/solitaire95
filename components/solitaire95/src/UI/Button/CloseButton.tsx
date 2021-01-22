import React from "react";
import styles from "./Button.module.scss";

type propTypes = {
  onClick?: () => void;
};

const CloseButton: React.FC<propTypes> = (props) => {
  const { onClick } = props;
  return (
    <div
      className={[styles.button, styles.closeButton].join(" ")}
      tabIndex={0}
      onClick={onClick}
    >
      <div className={styles.activeBorder}>X</div>
    </div>
  );
};

export default CloseButton;
