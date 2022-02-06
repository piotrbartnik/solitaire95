import React, { useEffect, useState } from "react";
import styles from "./Checkbox.module.scss";

type CheckboxPropTypes = {
  id: string;
  text: string | JSX.Element;
  checked: boolean;
  onClick: () => void;
  disabled?: boolean;
  label?: string;
};

export const Checkbox: React.FC<CheckboxPropTypes> = (props) => {
  const { id, label = "", checked, onClick, disabled, text } = props;

  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => setIsChecked(checked), [checked]);

  return (
    <div className={styles.checkbox} aria-checked={isChecked}>
      <div
        className={[
          styles.doubleBorder,
          isChecked ? styles["doubleBorder__selected"] : null,
        ].join(" ")}
        onClick={() => {
          if (!disabled) {
            setIsChecked(!isChecked);
            onClick();
          }
        }}
      >
        <input
          type="checkbox"
          id={id}
          defaultChecked={isChecked}
          className={disabled ? styles.disabled : null}
          aria-label={label}
        />
      </div>
      <label
        htmlFor={id}
        className={[styles.label, disabled ? styles.disabled : null].join(" ")}
      >
        {text}
      </label>
    </div>
  );
};
