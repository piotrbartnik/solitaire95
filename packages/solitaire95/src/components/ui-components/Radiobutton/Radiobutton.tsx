import React from "react";
// import styles from "./Checkbox.module.scss";

type RadiobuttonPropTypes = {
  id: string;
  label: string;
};

export const Radiobutton: React.FC<RadiobuttonPropTypes> = (props) => {
  const { id, label } = props;

  return (
    <>
      <input type="radio" id={id} />
      <label htmlFor={id}>{label}</label>
    </>
  );
};
