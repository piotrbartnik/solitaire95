import React, { useState } from "react";
import styles from "./CardDestination.module.scss";

const CardDestination: React.FC = () => {
  const [cardsOnField] = useState([]);

  console.log(cardsOnField);

  return <div className={styles.cardDestination}></div>;
};

export default CardDestination;
