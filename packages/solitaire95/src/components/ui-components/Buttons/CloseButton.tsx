import React, { useState } from "react";
import xButton from "../../../static/misc/xButton.png";
import styles from "./Button.module.scss";

type CloseButtonPropTypes = {
  onClick?: () => void;
  ariaLabel?: string;
};

export const CloseButton: React.FC<CloseButtonPropTypes> = ({
  onClick,
  ariaLabel,
}) => {
  const [buttonActive, setButtonActive] = useState(false);

  return (
    <div
      role="button"
      title="close window"
      aria-label={ariaLabel ? `${ariaLabel} close button` : undefined}
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
        setButtonActive(false);
      }}
      onMouseLeave={() => {
        setButtonActive(false);
      }}
      onClick={() => onClick?.()}
      style={{ backgroundImage: `url(${xButton})` }}
    >
      <div
        className={buttonActive ? styles.button__activeBorder : undefined}
      ></div>
    </div>
  );
};
