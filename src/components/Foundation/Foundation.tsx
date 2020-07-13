import React from "react";
import { Card } from "..";
import styles from "./Foundation.module.scss";

type propTypes = {
  cardsOnStock?: string[];
};

const Foundation: React.FC<propTypes> = (props) => {
  const { cardsOnStock } = props;

  return (
    <div className={styles.foundation}>
      {cardsOnStock?.length
        ? cardsOnStock.map((el) => (
            <Card front={el} back={"acorns"} isTurnedBack={false} />
          ))
        : null}
    </div>
  );
};

export default Foundation;
