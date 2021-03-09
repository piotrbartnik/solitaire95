import React from "react";
import styles from "./ToolDropdown.module.scss";

type PropTypes = {
  children?: React.ReactChild;
  visible: boolean;
  buttonId: string;
};

export const ToolDropdown: React.FC<PropTypes> = (props) => {
  const { children, visible, buttonId } = props;
  return (
    <div
      className={[
        styles.dropdownContainer,
        visible ? styles.dropdownContainer__visible : null,
      ].join(" ")}
      role="listbox"
      aria-labelledby={buttonId}
      hidden={!visible}
    >
      <div className={styles.dropdownContainer__wrapper}>{children}</div>
    </div>
  );
};
