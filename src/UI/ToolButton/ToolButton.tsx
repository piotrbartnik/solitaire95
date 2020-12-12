import React, { ReactNode } from "react";
import styles from "./ToolButton.module.scss";

type propTypes = {
  dealCards?: any;
  onClick?: any;
  children?: ReactNode;
};

const ToolButton: React.FC<propTypes> = (props) => {
  const { onClick, children } = props;
  return (
    <div onClick={onClick} className={styles.shortcutLetter}>
      {children}
    </div>
  );
};

export default ToolButton;
