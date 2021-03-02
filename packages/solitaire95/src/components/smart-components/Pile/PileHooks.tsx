import { useLayoutEffect } from "react";

export const useSetCardsPositionFromTopOnPiles = (ref: {
  current: HTMLDivElement;
}): void => {
  useLayoutEffect(() => {
    const cardsOnPile = ref.current.querySelectorAll("div[data-front]");
    const cardsOnPileBack = ref.current.querySelectorAll(
      "div[data-front='false']"
    );
    cardsOnPile.forEach((card: HTMLDivElement, index: number) => {
      if (card.dataset.front === "false") {
        (card.parentNode as HTMLDivElement).style.top = `${5 * index}px`;
      }
      if (card.dataset.front === "true") {
        const frontHeight = index - cardsOnPileBack.length;
        (card.parentNode as HTMLDivElement).style.top = `${
          cardsOnPileBack.length * 5 + frontHeight * 27
        }px`;
      }
    });
  });
};
