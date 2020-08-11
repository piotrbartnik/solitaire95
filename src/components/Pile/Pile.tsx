import React from "react";
import { Card } from "..";
import styles from "./Pile.module.scss";

const Pile: React.FC = () => {
  return (
    <div className={styles.pile__container}>
      <div className={styles.pile__firstCard}>
        <Card front={"kingOfHearts"} back={"acorns"} isTurnedBack={false} />
      </div>
      <div className={styles.pile__secondCard}>
        <Card front={"kingOfHearts"} back={"acorns"} isTurnedBack={false} />
      </div>
      <div className={styles.pile__thirdCard}>
        <Card front={"kingOfHearts"} back={"acorns"} isTurnedBack={false} />
      </div>
    </div>
  );
};

export default Pile;
