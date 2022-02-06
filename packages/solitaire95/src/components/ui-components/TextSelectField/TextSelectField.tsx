import React from "react";
import styles from "./TextSelectField.module.scss";

type TextSeletFieldPropTypes = {
  fieldHeight?: string;
};

export const TextSelectField: React.FC<TextSeletFieldPropTypes> = ({
  children,
  fieldHeight = "350px",
}) => {
  return (
    <div
      className={styles.textSelect__container}
      style={{ height: fieldHeight }}
    >
      <div className={styles.textSelect__field}>{children}</div>
    </div>
  );
};
