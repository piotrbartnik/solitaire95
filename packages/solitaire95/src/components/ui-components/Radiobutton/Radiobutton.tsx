import React from "react";
// import styles from "./Checkbox.module.scss";

type RadiobuttonPropTypes = {
  id: string;
  label: string;
  name: string;
};

export const Radiobutton: React.FC<RadiobuttonPropTypes> = (props) => {
  const { id, label, name } = props;

  return (
    <>
      <input type="radio" id={id} name={name} />
      <label htmlFor={id}>{label}</label>
    </>
  );
};
