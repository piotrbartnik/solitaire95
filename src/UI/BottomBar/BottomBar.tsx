import React from "react";
import { Timer } from "../../components";
import styles from "./BottomBar.module.scss";

const BottomBart: React.FC = () => {
  return (
    <div className={styles.bottomBar__bar}>
      <Timer />
    </div>
  );
};

export default BottomBart;
