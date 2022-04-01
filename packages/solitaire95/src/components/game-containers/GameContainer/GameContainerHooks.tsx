import { useEffect, useState } from "react";
import { MutableRefObject } from "react";

export const useCountDistanceBetweenPiles = (
  pilesContainer: MutableRefObject<null>
): number => {
  const [distanceBtwPiles, setDistanceBtwPiles] = useState(0);

  const debounce = (callback: (distance: number) => void, wait: number) => {
    let timeoutId: undefined | number = undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (distance: any) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback(distance);
      }, wait);
    };
  };

  useEffect(() => {
    const setDistance = () => {
      const node = pilesContainer.current;
      if (node) {
        const cardPiles = (node as HTMLElement).querySelectorAll(
          "div[class*='pile__container']"
        );

        const firstPileRightDistance =
          cardPiles[0]?.getBoundingClientRect().right;
        const secondPileLeftDistance =
          cardPiles[1]?.getBoundingClientRect().left;

        setDistanceBtwPiles(secondPileLeftDistance - firstPileRightDistance);
      }
    };

    setDistance();

    window.addEventListener("resize", debounce(setDistance, 250));

    return () =>
      window.removeEventListener("resize", debounce(setDistance, 250));
  }, [pilesContainer]);

  return distanceBtwPiles;
};
