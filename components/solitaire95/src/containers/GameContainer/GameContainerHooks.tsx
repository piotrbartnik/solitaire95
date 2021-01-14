import { useEffect, useState } from "react";

export const useCountDistanceBetweenPiles = (pilesContainer: any) => {
  const [distanceBtwPiles, setDistanceBtwPiles] = useState(0);

  useEffect(() => {
    const setDistance = () => {
      const node = pilesContainer.current;
      if (node) {
        const cardPiles = (node as HTMLElement).querySelectorAll(
          "div[class*='pile__container']"
        );

        const firstPileRightDistance = cardPiles[0]?.getBoundingClientRect()
          .right;
        const secondPileLeftDistance = cardPiles[1]?.getBoundingClientRect()
          .left;
        setDistanceBtwPiles(secondPileLeftDistance - firstPileRightDistance);
      }
    };

    setDistance();

    window.addEventListener("resize", setDistance);

    return () => window.removeEventListener("resize", setDistance);
  }, [pilesContainer]);

  return distanceBtwPiles;
};
