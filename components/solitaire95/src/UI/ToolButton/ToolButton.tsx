import React, { ReactNode } from "react";
import styles from "./ToolButton.module.scss";

type propTypes = {
  dealCards?: any;
  onClick?: any;
  children?: ReactNode;
  onMouseOver?: any;
  onMouseLeave?: any;
};

const ToolButton: React.FC<propTypes> = (props) => {
  const { onClick, children, onMouseOver, onMouseLeave } = props;
  return (
    <div className={styles.toolElement}>
      <div
        onClick={onClick}
        className={styles.shortcutLetter}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
    </div>
  );
};

export default ToolButton;
