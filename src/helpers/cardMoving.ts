export const moveToFoundation = (
  event: any,
  cardsOnFoundations: any,
  foundationConfig: any,
  addToFoundationCallback: any,
  removeFromCallback: any,
  pileOrStock: boolean,
  cardsFromStock?: []
) => {
  const { cardname, pilenumber, suite } = event.target.dataset;
  if (cardname.match("ace")) {
    let foundationToPopulate: string[] = [];
    Object.keys(cardsOnFoundations).forEach((foundation) => {
      if (!cardsOnFoundations[foundation].cards.length) {
        foundationToPopulate.push(foundation);
      }
    });
    if (!cardsOnFoundations[foundationToPopulate[0]].cards.length) {
      addToFoundationCallback(cardname, foundationToPopulate[0], suite);
      pileOrStock
        ? removeFromCallback(pilenumber)
        : removeFromCallback(
            (cardsFromStock as []).filter((el) => el !== cardname)
          );
      foundationConfig[suite].shift();
    }
  }

  if (!cardname.match("ace")) {
    Object.keys(cardsOnFoundations).forEach((foundation) => {
      if (
        cardsOnFoundations[foundation].foundationSuite === suite &&
        foundationConfig[cardsOnFoundations[foundation].foundationSuite][0] ===
          cardname
      ) {
        foundationConfig[suite].shift();
        pileOrStock
          ? removeFromCallback(pilenumber)
          : removeFromCallback(
              (cardsFromStock as []).filter((el) => el !== cardname)
            );
        addToFoundationCallback(cardname, foundation);
      }
    });
  }
};
