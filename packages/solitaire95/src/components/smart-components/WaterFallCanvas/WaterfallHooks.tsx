import { useEffect, MutableRefObject, Dispatch, SetStateAction } from "react";
import sprite from "./cards-sprite.png";

const spriteSuiteOrder = {
  clubs: 0,
  hearts: 1,
  spades: 2,
  diamonds: 3,
};

export const useRunWaterfallAnimation = (
  canvasRef: MutableRefObject<null>,
  foundationsOrder: [string, number][],
  setContext: Dispatch<SetStateAction<CanvasRenderingContext2D | undefined>>,
  canvasHeight: number,
  canvasWidth: number,
  setStartAnimation: Dispatch<SetStateAction<number | undefined>>,
  cancelCardAnimation: (
    animation: number,
    context: CanvasRenderingContext2D
  ) => void
): void => {
  const drawStockRectangle = (context: CanvasRenderingContext2D) => {
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(143, 187);
    context.arcTo(20, 187, 0, 0, 7);
    context.arcTo(20, 13, 149, 0, 7);
    context.arcTo(149, 13, 149, 187, 7);
    context.arcTo(149, 187, 0, 187, 7);
    context.stroke();
    context.beginPath();
    context.lineWidth = 14;
    context.strokeStyle = "#00ff00";
    context.arc(84, 99, 53, 0, 2 * Math.PI);
    context.stroke();
  };

  const drawKings = (context: CanvasRenderingContext2D) => {
    const image = new Image();
    image.src = sprite;
    image.onload = () => {
      foundationsOrder.forEach((cardSuite) => {
        context.drawImage(
          image,
          12 * 71,
          spriteSuiteOrder[cardSuite[0]] * 96,
          71,
          96,
          cardSuite[1],
          12,
          130,
          175
        );
      });
    };
  };
  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = (canvas as HTMLCanvasElement)?.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      setContext(context);
      context.imageSmoothingEnabled = false;
      context.fillStyle = "#20ac55";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      drawKings(context);
      drawStockRectangle(context);

      let cardSpot = 0;
      let nextImagePositionFromLetf = -4;
      let nextImagePositionFromTop = 4;
      let startingPositionFromLeft = foundationsOrder[cardSpot][1];
      let startingPositionFromTop = 12;
      let cardDecaySpeed = 0.2;
      let cardToAnimate = 12;

      const animate = () => {
        const drawCards = (context: CanvasRenderingContext2D) => {
          const draw = () => {
            const image = new Image();
            image.src = sprite;
            startingPositionFromLeft += nextImagePositionFromLetf * 1;
            startingPositionFromTop += nextImagePositionFromTop * 2;
            nextImagePositionFromTop += cardDecaySpeed;

            if (startingPositionFromTop >= canvasHeight - 175) {
              startingPositionFromTop = canvasHeight - 175;
              nextImagePositionFromTop =
                nextImagePositionFromTop * -1 * 0.7 +
                (1.0 - Math.random() * 2.0);
              if (nextImagePositionFromTop > 0.1) nextImagePositionFromTop = -1;
            }

            if (
              startingPositionFromLeft <= -130 ||
              startingPositionFromLeft >= canvasWidth
            ) {
              cardSpot++;
              if (cardSpot >= 4) {
                cardSpot = 0;
                cardToAnimate--;
              }
              cardDecaySpeed = 0.3;
              nextImagePositionFromLetf = 4 * (1 - Math.random() * 2);
              if (nextImagePositionFromLetf > 0) nextImagePositionFromLetf += 1;
              else nextImagePositionFromLetf -= 1;
              nextImagePositionFromTop = 4 * Math.random();
              startingPositionFromLeft = foundationsOrder[cardSpot][1];
              startingPositionFromTop = 12;
            }
            image.onload = () => {
              context.drawImage(
                image,
                cardToAnimate * 71,
                spriteSuiteOrder[foundationsOrder[cardSpot][0]] * 96,
                71,
                96,
                startingPositionFromLeft,
                startingPositionFromTop,
                130,
                175
              );
            };
          };
          draw();
        };

        const startAnimation = window.requestAnimationFrame(animate);
        setStartAnimation(startAnimation);
        if (cardToAnimate === -1) {
          cancelCardAnimation(startAnimation, context);
        }
        drawCards(context);
      };
      animate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useCancelCanvasAnimation = (
  cancelCardAnimation: any,
  startAnimationState: any,
  contextState: any
): any => {
  useEffect(() => {
    const cancelCanvasAnimationOnEsc = (e: KeyboardEvent) => {
      e.key === "Escape" &&
        cancelCardAnimation(
          startAnimationState as number,
          contextState as CanvasRenderingContext2D
        );
    };
    window.addEventListener("keydown", cancelCanvasAnimationOnEsc);

    return () =>
      window.removeEventListener("keydown", cancelCanvasAnimationOnEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimationState, contextState]);
};
