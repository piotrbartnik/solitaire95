import React from "react";
import styles from "./ToolButton.module.scss";

type ToolButtonPropTypes = {
  onClick?: undefined | (() => void);
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  disabled?: boolean;
  text: string | JSX.Element;
  label?: string;
};

export const ToolButton: React.FC<ToolButtonPropTypes> = (props) => {
  const {
    onClick,
    onMouseOver,
    onMouseLeave,
    text,
    disabled,
    label = "",
  } = props;

  const handleToolButtonKeyPress = ({ key }: { key: string }) => {
    if (onClick && key === "Enter") {
      onClick();
    }
  };

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={[
        styles.shortcutLetter,
        disabled && styles.disabled,
        styles.toolElement,
      ].join(" ")}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={!disabled ? 1 : 0}
      onKeyDown={handleToolButtonKeyPress}
      aria-label={label}
    >
      {text}
    </div>
  );
};
