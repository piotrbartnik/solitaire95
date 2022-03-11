import React, { useState, useEffect } from "react";
import styles from "./RadioButton.module.scss";

type RadiobuttonPropTypes = {
  label: string;
  onClick: () => void;
  currentValue: string;
  underscoredLetter?: number;
};

export const Radiobutton: React.FC<RadiobuttonPropTypes> = ({
  label,
  onClick,
  currentValue,
  underscoredLetter,
}) => {
  const [isChecked, setIsChecked] = useState(currentValue === label);

  useEffect(() => {
    setIsChecked(currentValue === label);
  }, [currentValue, label]);

  const handleButtonClick = ({ key }: { key: string }) => {
    if (key === "Enter") {
      onClick();
    }
  };

  return (
    <div
      className={styles.radioWrapper}
      onClick={onClick}
      role="radio"
      id={label}
      aria-label={label}
      onKeyDown={handleButtonClick}
    >
      <div className={styles.customRadio__outer}>
        <div className={styles.customRadio__inner}>
          <div
            className={styles.customRadio__circle}
            style={{ visibility: isChecked ? "visible" : "hidden" }}
          />
        </div>
      </div>
      <label htmlFor={label} className={styles.radioLabel} tabIndex={1}>
        {label
          .split("")
          .map((letter, index) =>
            index === underscoredLetter ? (
              <span key={`${index}${letter}`}>{letter}</span>
            ) : (
              letter
            )
          )}
      </label>
    </div>
  );
};
