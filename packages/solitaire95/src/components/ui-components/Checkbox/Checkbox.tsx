import React, { useState } from "react";
import styles from "./Checkbox.module.scss";

type CheckboxPropTypes = {
  id: string;
  label: string;
  checked: boolean;
  onClick?: () => void;
};

export const Checkbox: React.FC<CheckboxPropTypes> = (props) => {
  const { id, label, checked, onClick } = props;

  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div onClick={onClick} className={styles.checkbox}>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
