import React from "react";
import { Card } from "..";
import styles from "./CardDestinationField.module.scss";

type propTypes = {
  cardsOnPile?: string[];
};

const CardDestination: React.FC<propTypes> = (props) => {
  const { cardsOnPile } = props;

  return (
    <div className={styles.cardDestination}>
      {cardsOnPile?.length
        ? cardsOnPile.map((el) => (
            <Card front={el} back={"acorns"} isTurnedBack={false} />
          ))
        : null}
    </div>
  );
};

export default CardDestination;
