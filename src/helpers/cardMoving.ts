import { cardConfigType } from "../configs/cardTypes";

export const moveToFoundation = (
  event: any,
  cardsOnFoundations: any,
  addToFoundationCallback: any,
  removeFromCallback: any,
  pileOrStock: boolean,
  cardsFromStock?: cardConfigType[]
) => {
  const { cardname, suite, color, pilenumber, order } = event.target.dataset;
  const cardConfig: cardConfigType = [cardname, suite, true, color, order];

  if (cardname?.match("ace")) {
    let foundationToPopulate: string[] = [];
    Object.keys(cardsOnFoundations).forEach((foundation) => {
      if (!cardsOnFoundations[foundation].cards.length) {
        foundationToPopulate.push(foundation);
      }
    });

    if (!cardsOnFoundations[foundationToPopulate[0]].cards.length) {
      addToFoundationCallback(cardConfig, foundationToPopulate[0], suite);
      pileOrStock
        ? removeFromCallback(pilenumber)
        : removeFromCallback(
            (cardsFromStock as cardConfigType[]).filter(
              (card) => `${card[0]}_${card[1]}` !== `${cardname}_${suite}`
            )
          );
    }
  }

  if (!cardname?.match("ace")) {
    Object.keys(cardsOnFoundations).forEach((foundation) => {
      if (cardsOnFoundations[foundation].foundationSuite === suite) {
        const cardsOnFoundation = cardsOnFoundations[foundation].cards;
        if (
          parseInt(cardsOnFoundation[cardsOnFoundation.length - 1][4]) ===
          order - 1
        ) {
          pileOrStock
            ? removeFromCallback(pilenumber)
            : removeFromCallback(
                (cardsFromStock as cardConfigType[]).filter(
                  (card) => `${card[0]}_${card[1]}` !== `${cardname}_${suite}`
                )
              );
          addToFoundationCallback(cardConfig, foundation);
        }
      }
    });
  }
};
