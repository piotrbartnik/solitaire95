import React, { ReactElement } from "react";
import styles from "./App.module.scss";
import card from "./card.png";

const App = (): ReactElement => {
  return (
    <div className={styles.App}>
      <img src={card} />
    </div>
  );
};

export default App;
