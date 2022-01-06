import React from "react";
import styles from "./TopbarButton.module.scss";

type TopbarButtonPropTypes = {
  text: string | JSX.Element;
  label?: string;
  onClick: () => void;
  id: string;
  active?: boolean;
  onMouseOver?: () => void;
};

export const TopbarButton: React.FC<TopbarButtonPropTypes> = (props) => {
  const { text, onClick, id, active, onMouseOver, label = "" } = props;

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
      aria-label={label}
    >
      {text}
    </div>
  );
};
