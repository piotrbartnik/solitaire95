import React from "react";
import styles from "./TextSelectField.module.scss";

export const TextSelectField: React.FC = ({ children }) => {
  return (
    <div className={styles.textSelectContainer}>
      <div className={styles.textSelectField}>{children}</div>
    </div>
  );
};
