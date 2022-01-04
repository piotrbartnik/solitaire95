import React from "react";
import styles from "./ToolButton.module.scss";

type ToolButtonPropTypes = {
  onClick?: undefined | (() => void);
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  disabled?: boolean;
  text: string;
};

export const ToolButton: React.FC<ToolButtonPropTypes> = (props) => {
  const { onClick, onMouseOver, onMouseLeave, text, disabled } = props;

  const handleToolButtonKeyPress = ({ key }: { key: string }) => {
    if (onClick && key === "Enter") {
      onClick();
    }
  };

  return (
    <div className={styles.toolElement}>
      <div
        onClick={!disabled ? onClick : undefined}
        className={[styles.shortcutLetter, disabled && styles.disabled].join(
          " "
        )}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        role="button"
        tabIndex={1}
        onKeyDown={handleToolButtonKeyPress}
      >
        {text}
      </div>
    </div>
  );
};
