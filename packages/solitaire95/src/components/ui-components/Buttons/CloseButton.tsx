import React, { useState } from "react";
import xButton from "../../../static/misc/xButton.png";
import styles from "./Button.module.scss";

type CloseButtonPropTypes = {
  onClick?: () => void;
};

export const CloseButton: React.FC<CloseButtonPropTypes> = (props) => {
  const { onClick } = props;
  const [buttonActive, setButtonActive] = useState(false);

  return (
    <div
      role="button"
      title="close window"
      className={[
        styles.button,
        styles.closeButton,
        buttonActive ? styles["button--active"] : undefined,
      ].join(" ")}
      tabIndex={0}
      onMouseDown={() => {
        setButtonActive(true);
      }}
      onMouseUp={() => {
        setTimeout(() => onClick?.(), 50);
        setButtonActive(false);
      }}
      style={{ backgroundImage: `url(${xButton})` }}
    >
      <div className={buttonActive ? styles.activeBorder : undefined}></div>
    </div>
  );
};
