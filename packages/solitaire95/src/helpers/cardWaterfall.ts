import { RefObject } from "react";

export const cardWaterfall = (
  mainPageRef: RefObject<HTMLDivElement>,
  cardsOnfoundationRef: NodeListOf<Element>
): void => {
  const allCards = ["king"];
  const pageRef = mainPageRef.current;
  for (let i = 0; i < allCards.length; i++) {
    const cardToMove = cardsOnfoundationRef[51 - i]?.parentElement;
    const parentPosition: number[] = [
      cardToMove?.getBoundingClientRect().x as number,
      cardToMove?.getBoundingClientRect().y as number,
    ];
    const gameContainer = pageRef?.querySelector("[class*='gameContainer']");

    const vx = -4; // next image position from the left
    let vy = 4; // next image from the top
    let cx = parentPosition[0]; // position from the left
    let cy = parentPosition[1]; // position from the top
    const decay = 0.2;

    let y = 0;

    while (cx > -126 && cx < window.innerWidth + 126) {
      cx += vx * 1;
      cy += vy * 1;
      vy += decay * 1;
      const cardClone = cardToMove?.cloneNode(true);
      y++;

      if (cy >= 918 - 171) {
        cy = 918 - 171;
        vy = vy * -1 * 0.7 + (1.0 - Math.random() * 2.0); //(Math.random() *2)
        if (vy > 0.1) vy = -1;
      }
      (cardClone as Element)?.setAttribute(
        "style",
        `position:fixed; top:${cy}px;
        left:${cx}px;
        z-index: ${1000 + y}`
      );
      setTimeout(() => {
        gameContainer?.append(cardClone as Node);
      }, 10 * y);
    }
  }
};
