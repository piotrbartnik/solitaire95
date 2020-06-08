import React from "react";
import styles from "./App.module.scss";
import card from "./card.png";

function App() {
  return (
    <div className={styles.App}>
      <img src={card} />
    </div>
  );
}

export default App;
