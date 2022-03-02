import React, { useEffect, useState } from "react";
import styles from "./Checkbox.module.scss";

type CheckboxPropTypes = {
  id: string;
  checked: boolean;
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  underscoredLetter?: number;
};

export const Checkbox: React.FC<CheckboxPropTypes> = ({
  id,
  label = "",
  checked,
  onClick,
  disabled,
  underscoredLetter,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => setIsChecked(checked), [checked]);

  const handleButtonClick = ({ key }: { key: string }) => {
    if (key === "Enter") {
      if (!disabled) {
        setIsChecked(!isChecked);
        onClick();
      }
    }
  };

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
        tabIndex={1}
        onKeyPress={handleButtonClick}
      >
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
