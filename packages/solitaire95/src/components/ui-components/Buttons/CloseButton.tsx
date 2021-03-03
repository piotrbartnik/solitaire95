import React from "react";
import xButton from "../../../static/misc/xButton.png";
import styles from "./Button.module.scss";

type PropTypes = {
  onClick?: () => void;
};

export const CloseButton: React.FC<PropTypes> = (props) => {
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
