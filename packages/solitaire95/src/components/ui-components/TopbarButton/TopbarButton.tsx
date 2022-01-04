import React from "react";
import styles from "./TopbarButton.module.scss";

type TopbarButtonPropTypes = {
  buttonText: string;
  onClick: () => void;
  id: string;
  active?: boolean;
  onMouseOver?: () => void;
};

export const TopbarButton: React.FC<TopbarButtonPropTypes> = (props) => {
  const { buttonText, onClick, id, active, onMouseOver } = props;

  const handleTopBarButtonKeyPress = ({ key }: { key: string }) => {
    if (key === " " || key === "Enter") {
      onClick();
    }
  };

  return (
    <div
      className={[styles.container, active ? styles.active : ""].join(" ")}
      onClick={onClick}
      role="button"
      id={id}
      onMouseOver={onMouseOver}
      tabIndex={1}
      onKeyPress={handleTopBarButtonKeyPress}
    >
      <span>{buttonText}</span>
    </div>
  );
};
