import React from "react";
import styles from "./RadioButton.module.scss";

type RadiobuttonPropTypes = {
  id: string;
  label: string;
  name: string;
};

export const Radiobutton: React.FC<RadiobuttonPropTypes> = (props) => {
  const { id, label, name } = props;

  return (
    <div className={styles.radioWrapper}>
      <input type="radio" id={id} name={name} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
