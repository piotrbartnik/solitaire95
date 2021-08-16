import React, { useState, useEffect } from "react";
import styles from "./RadioButton.module.scss";

type RadiobuttonPropTypes = {
  id: string;
  label: string;
  onClick: () => void;
  currentValue: string;
};

export const Radiobutton: React.FC<RadiobuttonPropTypes> = (props) => {
  const { id, label, onClick, currentValue } = props;

  const [isChecked, setIsChecked] = useState(currentValue === label);

  useEffect(() => {
    setIsChecked(currentValue === label);
  }, [currentValue, label]);

  return (
    <div className={styles.radioWrapper} onClick={onClick} id={id} role="radio">
      <div className={styles.customRadio__outer}>
        <div className={styles.customRadio__inner}>
          <div
            className={styles.customRadio__circle}
            style={{ visibility: isChecked ? "visible" : "hidden" }}
          />
        </div>
      </div>
      <span>{label}</span>
    </div>
  );
};
