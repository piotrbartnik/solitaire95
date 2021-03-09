import React from "react";
import styles from "./TopbarButton.module.scss";

type TopbarButtonPropTypes = {
  buttonText: string;
  onClick: () => void;
  id: string;
};

export const TopbarButton: React.FC<TopbarButtonPropTypes> = (props) => {
  const { buttonText, onClick, id } = props;
  return (
    <div className={styles.container} onClick={onClick} role="button" id={id}>
      <span>{buttonText}</span>
    </div>
  );
};
