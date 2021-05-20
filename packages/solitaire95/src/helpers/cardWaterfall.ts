import { RefObject } from "react";

const whileCallback = (
  cx: number,
  cy: number,
  vy: number,
  vx: number,
  decay: number,
  cardToMove: HTMLElement | null
) => {
  let y = 0;

  const cardArray = [];

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
    cardArray.push(cardClone);
  }

  return cardArray;
};

export const cardWaterfall = (
  mainPageRef: RefObject<HTMLDivElement>,
  cardsOnfoundationRef: NodeListOf<Element>,
  i: number,
  vy: number | undefined,
  vx: number | undefined,
  decay: number | undefined
): void => {
  console.log(i);
  const pageRef = mainPageRef.current;
  const cardToMove = cardsOnfoundationRef[12]?.parentElement;
  const parentPosition: number[] = [
    cardToMove?.getBoundingClientRect().x as number,
    cardToMove?.getBoundingClientRect().y as number,
  ];
  const gameContainer = pageRef?.querySelector("[class*='gameContainer']");

  const cx = parentPosition[0]; // position from the left
  const cy = parentPosition[1]; // position from the top

  const cardsToRender: (Node | undefined)[] = [];

  cardsToRender.push(
    ...whileCallback(
      cx,
      cy,
      vy as number,
      vx as number,
      decay as number,
      cardToMove
    )
  );

  for (let y = 0; y < cardsToRender.length; y++) {
    setTimeout(() => {
      gameContainer?.append(cardsToRender[y] as Node);
    }, 10 * y);
  }
};
