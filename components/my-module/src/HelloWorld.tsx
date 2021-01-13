import React, { useState } from "react";
import img from "./test.jpg";
import styles from "./HelloWorld.module.scss";

export const HelloWorld = () => {
  const [x] = useState(10);
  return (
    <div className={styles.test}>
      Oh yeah hot reload is working well
      {x}
      <img src={img} />
    </div>
  );
};
