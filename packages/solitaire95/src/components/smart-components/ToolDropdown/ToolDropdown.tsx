import React from "react";
import styles from "./ToolDropdown.module.scss";

type PropTypes = {
  children?: React.ReactChild;
  visible: boolean;
};

const ToolDropdown: React.FC<PropTypes> = (props) => {
  const { children, visible } = props;
  return (
    <div
      className={[
        styles.dropdownContainer,
        visible ? styles.dropdownContainer__visible : null,
      ].join(" ")}
    >
      <div className={styles.dropdownContainer__wrapper}>{children}</div>
    </div>
  );
};

export default ToolDropdown;
