import * as React from "react";
import img from "./test.jpg";
import styles from "./HelloWorld.module.scss";

export const HelloWorld = () => (
  <div className={styles.test}>
    Oh yeah hot reload is working well
    <img src={img} />
  </div>
);
