import React, { useContext } from "react";
import styles from "./TopbarButton.module.scss";
import { WindowsOpenedContext } from "../../game-containers";

type TopbarButtonPropTypes = {
  underscoredLetter?: number;
  label?: string;
  onClick: () => void;
  id: string;
  active?: boolean;
  onMouseOver?: () => void;
};

export const TopbarButton: React.FC<TopbarButtonPropTypes> = ({
  underscoredLetter,
  onClick,
  id,
  active,
  onMouseOver,
  label = "",
}) => {
  const handleTopBarButtonKeyPress = ({ key }: { key: string }) => {
    if (key === " " || key === "Enter") {
      onClick();
    }
  };

  const { isAnyWindowOpened } = useContext(WindowsOpenedContext);

  return (
    <div
      className={[styles.container, active ? styles.active : ""].join(" ")}
      onClick={onClick}
      role="button"
      id={id}
      onMouseOver={onMouseOver}
      tabIndex={!isAnyWindowOpened ? 1 : -1}
      onKeyPress={handleTopBarButtonKeyPress}
      aria-label={label}
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
    </div>
  );
};
