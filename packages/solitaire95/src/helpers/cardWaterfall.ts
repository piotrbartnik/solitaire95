import { RefObject } from "react";

export const cardWaterfall = (
  mainPageRef: RefObject<HTMLDivElement>,
  cardsOnfoundationRef: NodeListOf<Element>
): void => {
  const pageRef = mainPageRef.current;
  const king = cardsOnfoundationRef[51]?.parentElement;
  const parentPosition: number[] = [
    king?.getBoundingClientRect().x as number,
    king?.getBoundingClientRect().y as number,
  ];

  const gameContainer = pageRef?.querySelector("[class*='gameContainer']");

  for (let i = 0; i < 90; i++) {
    const kingClone = king?.cloneNode(true);

    (kingClone as Element)?.setAttribute(
      "style",
      `position:fixed; top:${parentPosition[1] + 5 + i * 8}px;
        left:${parentPosition[0] - 5 - i * 8}px`
    );
    gameContainer?.append(kingClone as Node);
  }
};
