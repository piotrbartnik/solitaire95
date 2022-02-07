import React, { useState } from "react";
import styles from "./Button.module.scss";

type ButtonPropTypes = {
  text: string | JSX.Element;
  onClick?: () => void;
  label?: string;
};

export const Button: React.FC<ButtonPropTypes> = (props) => {
  const { text, onClick, label = "" } = props;
  const [buttonActive, setButtonActive] = useState(false);
  return (
    <div
      className={[
        styles.button,
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
      role="button"
      aria-label={label}
    >
      <div className={buttonActive ? styles.button__activeBorder : undefined}>
        {text}
      </div>
    </div>
  );
};
