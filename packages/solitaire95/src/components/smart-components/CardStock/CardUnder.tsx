const cardUnderThreeCards = ({ index, card, children }) => (
  <div
    className={[styles.cardContainer, styles[`card_${index}`]].join(" ")}
    id={`${index}`}
    key={`${index}${card}cardsOnStock`}
  ></div>
);
