import React from "react";
import styles from "./ToolButton.module.scss";

type propTypes = {
  dealCards?: any;
  onClick?: any;
  onMouseOver?: any;
  onMouseLeave?: any;
  disabled?: boolean;
  text: string;
};

const ToolButton: React.FC<propTypes> = (props) => {
  const { onClick, onMouseOver, onMouseLeave, text, disabled } = props;
  console.log(styles, "dd");
  return (
    <div className={styles.toolElement}>
      <div
        onClick={!disabled && onClick}
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
