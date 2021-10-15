import { useEffect } from "react";
import { cardConfigType } from "../../../configs/cardTypes";

export const useGetThreeFromCardsOnStock = (
  threeCardsOnTable: cardConfigType[],
  cardsFromStock: cardConfigType[],
  takeThreeFromStock: (
    cardsOnStock: cardConfigType[],
    cardToAddToTable: cardConfigType[],
    threeCardsOnTable: cardConfigType[]
  ) => void,
  cardsOnStock: cardConfigType[]
): void => {
  useEffect(() => {
    if (!threeCardsOnTable?.length && cardsFromStock?.length) {
      const takeThreeFromCardsOnTable = cardsFromStock.slice(
        cardsFromStock.length - 3
      );

      takeThreeFromStock(cardsOnStock, [], takeThreeFromCardsOnTable);
    }
  }, [threeCardsOnTable, cardsFromStock, takeThreeFromStock, cardsOnStock]);
};
