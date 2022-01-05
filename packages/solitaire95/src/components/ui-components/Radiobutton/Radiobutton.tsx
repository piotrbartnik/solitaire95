import React, { useState, useEffect } from "react";
import styles from "./RadioButton.module.scss";

type RadiobuttonPropTypes = {
  label: string | JSX.Element;
  title: string;
  onClick: () => void;
  currentValue: string;
};

export const Radiobutton: React.FC<RadiobuttonPropTypes> = (props) => {
  const { label, onClick, currentValue, title } = props;

  const [isChecked, setIsChecked] = useState(currentValue === label);

  useEffect(() => {
    setIsChecked(currentValue === title);
  }, [currentValue, title]);

  return (
    <div
      className={styles.radioWrapper}
      onClick={onClick}
      role="radio"
      id={title}
    >
      <div className={styles.customRadio__outer}>
        <div className={styles.customRadio__inner}>
          <div
            className={styles.customRadio__circle}
            style={{ visibility: isChecked ? "visible" : "hidden" }}
          />
        </div>
      </div>
      <label htmlFor={title} className={styles.radioLabel}>
        {label}
      </label>
    </div>
  );
};
