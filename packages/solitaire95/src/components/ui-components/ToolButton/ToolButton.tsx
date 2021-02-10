import React from "react";
import styles from "./ToolButton.module.scss";

type toolButtonPropTypes = {
  onClick?: undefined | (() => void);
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  disabled?: boolean;
  text: string;
};

const ToolButton: React.FC<toolButtonPropTypes> = (props) => {
  const { onClick, onMouseOver, onMouseLeave, text, disabled } = props;
  return (
    <div className={styles.toolElement}>
      <div
        onClick={!disabled ? onClick : undefined}
        className={[styles.shortcutLetter, disabled && styles.disabled].join(
          " "
        )}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        {text}
      </div>
    </div>
  );
};

export default ToolButton;
