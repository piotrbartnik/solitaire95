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

  const handleButtonClick = ({ key }: { key: string }) => {
    if (key === "Enter") {
      onClick?.();
    }
  };

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
      tabIndex={1}
      onMouseDown={() => {
        setButtonActive(true);
      }}
      onMouseUp={() => {
        setButtonActive(false);
      }}
      onMouseLeave={() => {
        setButtonActive(false);
      }}
      onKeyPress={handleButtonClick}
      onClick={() => onClick?.()}
      style={{ backgroundImage: `url(${xButton})` }}
    >
      <div
        className={buttonActive ? styles.button__activeBorder : undefined}
      ></div>
    </div>
  );
};
