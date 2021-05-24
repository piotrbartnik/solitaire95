import { RefObject } from "react";

const whileCallback = (
  cx: number,
  cy: number,
  vy: number,
  vx: number,
  decay: number,
  cardToMove: HTMLElement | null,
  y: number
) => {
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
  vy: number | undefined,
  vx: number | undefined,
  decay: number | undefined
): void => {
  const nodeArray = Array.from(cardsOnfoundationRef);

  const cardsArray = [];
  const divideIn4 = 13;
  for (let i = 0; i < nodeArray.length; i += divideIn4) {
    cardsArray.push(nodeArray.slice(i, i + divideIn4));
  }

  const pageRef = mainPageRef.current;
  const cardsToRender: (Node | undefined)[] = [];
  const gameContainer = pageRef?.querySelector("[class*='gameContainer']");
  const helperArray = [
    0, 1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12, 12, 0, 1, 2, 3, 3, 4, 5,
    6, 6, 7, 8, 9, 9, 10, 11, 12, 12, 0, 1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 9, 10,
    11, 12, 12, 0, 1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12, 12,
  ];
  for (let g = 1; g < 54; g++) {
    const cardToMove =
      cardsOnfoundationRef[((12 * g) % 52) + helperArray[g - 1]]?.parentElement;
    const parentPosition: number[] = [
      cardToMove?.getBoundingClientRect().x as number,
      cardToMove?.getBoundingClientRect().y as number,
    ];

    const cx = parentPosition[0]; // position from the left
    const cy = parentPosition[1]; // position from the top

    decay = 0.3;
    vx = 4 * (1 - Math.random() * 2);
    if (vx > 0) vx += 1;
    else vx -= 1;
    vy = 4 * Math.random();

    cardsToRender.push(
      ...whileCallback(
        cx,
        cy,
        vy as number,
        vx as number,
        decay as number,
        cardToMove,
        g * 10 * 100
      )
    );
  }
  setTimeout(() => {
    for (let y = 0; y < cardsToRender.length; y++) {
      setTimeout(() => {
        gameContainer?.append(cardsToRender[y] as Node);
      }, 10 * y);
    }
  }, 1000);
};
