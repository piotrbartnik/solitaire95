import * as React from "react";
import img from "./test.jpg";
import styles from "./HelloWorld.module.scss";

export const HelloWorld = () => (
  <div className={styles.test}>
    HelloWorld test2
    <img src={img} />
  </div>
);
