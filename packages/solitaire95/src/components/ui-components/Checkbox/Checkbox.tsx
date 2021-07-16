import React, { useState } from "react";
import styles from "./Checkbox.module.scss";

type CheckboxPropTypes = {
  id: string;
  label: string;
  checked: boolean;
  onClick?: any;
};

export const Checkbox: React.FC<CheckboxPropTypes> = (props) => {
  const { id, label, checked, onClick } = props;

  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div onClick={onClick} className={styles.checkbox}>
      <div
        className={[
          styles.doubleBorder,
          isChecked ? styles["doubleBorder__selected"] : null,
        ].join(" ")}
        onClick={() => setIsChecked(!isChecked)}
      >
        <input type="checkbox" id={id} checked={isChecked} />
      </div>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
