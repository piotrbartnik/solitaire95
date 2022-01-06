import React, { useState, useEffect } from "react";
import styles from "./RadioButton.module.scss";

type RadiobuttonPropTypes = {
  text: string | JSX.Element;
  label: string;
  onClick: () => void;
  currentValue: string;
};

export const Radiobutton: React.FC<RadiobuttonPropTypes> = (props) => {
  const { label, onClick, currentValue, text } = props;

  const [isChecked, setIsChecked] = useState(currentValue === label);

  useEffect(() => {
    setIsChecked(currentValue === label);
  }, [currentValue, label]);

  return (
    <div
      className={styles.radioWrapper}
      onClick={onClick}
      role="radio"
      id={label}
      aria-label={label}
    >
      <div className={styles.customRadio__outer}>
        <div className={styles.customRadio__inner}>
          <div
            className={styles.customRadio__circle}
            style={{ visibility: isChecked ? "visible" : "hidden" }}
          />
        </div>
      </div>
      <label htmlFor={label} className={styles.radioLabel}>
        {text}
      </label>
    </div>
  );
};
