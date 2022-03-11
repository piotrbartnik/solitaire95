import React, { useState } from "react";
import styles from "./Button.module.scss";

type ButtonPropTypes = {
  text: string;
  onClick?: () => void;
  underscoredLetter?: number;
  disabled?: boolean;
};

export const Button: React.FC<ButtonPropTypes> = ({
  text,
  onClick,
  underscoredLetter,
  disabled,
}) => {
  const [buttonActive, setButtonActive] = useState(false);

  const handleButtonClick = ({ key }: { key: string }) => {
    if (key === "Enter" && !disabled) {
      onClick?.();
    }
  };

  return (
    <div
      className={[
        styles.button,
        buttonActive ? styles["button--active"] : undefined,
        disabled ? styles["button--disabled"] : undefined,
      ].join(" ")}
      tabIndex={!disabled ? 1 : -1}
      onMouseDown={() => {
        !disabled && setButtonActive(true);
      }}
      onMouseUp={() => {
        !disabled && setButtonActive(false);
      }}
      onMouseLeave={() => {
        !disabled && setButtonActive(false);
      }}
      onClick={() => !disabled && onClick?.()}
      onKeyPress={handleButtonClick}
      role="button"
      aria-label={text}
    >
      <div className={buttonActive ? styles.button__activeBorder : undefined}>
        {text
          .split("")
          .map((letter, index) =>
            index === underscoredLetter ? (
              <span key={`${index}${letter}`}>{letter}</span>
            ) : (
              letter
            )
          )}
      </div>
    </div>
  );
};
