import { useLayoutEffect } from "react";

export const useSetCardsPositionFromTopOnPiles = (ref: {
  current: HTMLDivElement;
}) => {
  useLayoutEffect(() => {
    const cardsOnPile = ref.current.querySelectorAll("div[data-front]");
    const cardsOnPileBack = ref.current.querySelectorAll(
      "div[data-front='false']"
    );
    cardsOnPile.forEach((card: any, index: any) => {
      if (card.dataset.front === "false") {
        card.parentNode.style.top = `${5 * index}px`;
      }
      if (card.dataset.front === "true") {
        const frontHeight = index - cardsOnPileBack.length;
        card.parentNode.style.top = `${
          cardsOnPileBack.length * 5 + frontHeight * 27
        }px`;
      }
    });
  });
};