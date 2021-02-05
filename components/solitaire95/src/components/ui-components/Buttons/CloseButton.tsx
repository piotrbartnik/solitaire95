import React from "react";
import xButton from "../../../static/misc/xButton.png";
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
      style={{ backgroundImage: `url(${xButton})` }}
    >
      <div className={styles.activeBorder}></div>
    </div>
  );
};

export default CloseButton;
