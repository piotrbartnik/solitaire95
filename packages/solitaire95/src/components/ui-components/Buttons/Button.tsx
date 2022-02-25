import React, { useState } from "react";
import styles from "./Button.module.scss";

type ButtonPropTypes = {
  text: string;
  onClick?: () => void;
  underscoredLetter?: number;
};

export const Button: React.FC<ButtonPropTypes> = ({
  text,
  onClick,
  underscoredLetter,
}) => {
  const [buttonActive, setButtonActive] = useState(false);

  const handleButtonClick = ({ key }: { key: string }) => {
    if (key === "Enter") {
      onClick?.();
    }
  };

  return (
    <div
      className={[
        styles.button,
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
      onClick={() => onClick?.()}
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
