import React from "react";
import styles from "./TopbarButton.module.scss";

type TopbarButtonPropTypes = {
  buttonText: string;
  onClick: () => void;
  id: string;
  active: boolean;
};

export const TopbarButton: React.FC<TopbarButtonPropTypes> = (props) => {
  const { buttonText, onClick, id, active } = props;
  return (
    <div
      className={[styles.container, active ? styles.active : ""].join(" ")}
      onClick={onClick}
      role="button"
      id={id}
    >
      <span>{buttonText}</span>
    </div>
  );
};
