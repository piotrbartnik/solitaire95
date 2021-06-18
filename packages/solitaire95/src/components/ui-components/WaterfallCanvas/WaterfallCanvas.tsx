import React, { useRef, useEffect } from "react";
import sprite from "./cards-sprite.png";

type WaterfallCanvasPropTypes = {
  canvasWidth: number;
  canvasHeight: number;
  foundationsOrder: [string, number][];
};

export const WaterfallCanvas: React.FC<WaterfallCanvasPropTypes> = (props) => {
  const { canvasWidth, canvasHeight, foundationsOrder } = props;

  const canvasRef = useRef(null);

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
    const spriteSuiteOrder = {
      clubs: 0,
      hearts: 1,
      spades: 2,
      diamonds: 3,
    };
    const image = new Image();
    image.src = sprite;
    image.onload = () => {
      foundationsOrder.forEach((cardSuite) => {
        context.drawImage(
          image,
          12 * 71, //Sprite X
          spriteSuiteOrder[cardSuite[0]] * 96, //Sprite Y
          71,
          96,
          cardSuite[1], //on screen X
          12, //on screen Y
          130,
          175
        );
      });
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = (canvas as HTMLCanvasElement).getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      context.imageSmoothingEnabled = false;
      context.fillStyle = "#20ac55";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      drawKings(context);
      drawStockRectangle(context);
      let vx = -4; // next image position from the left
      let vy = 4; // next image from the top
      let cx = 450; // position from the left
      let cy = 10; // position from the top
      let decay = 0.2;
      let spot = 0;
      let value = 12;

      const animate = () => {
        const drawCards = (context: CanvasRenderingContext2D) => {
          const draw = () => {
            const image = new Image();
            image.src = sprite;
            cx += vx * 1;
            cy += vy * 2;
            vy += decay;

            if (cy >= canvasHeight - 175) {
              cy = canvasHeight - 175;
              vy = vy * -1 * 0.7 + (1.0 - Math.random() * 2.0); //(Math.random() *2)
              if (vy > 0.1) vy = -1;
            }

            if (cx <= -130 || cx >= canvasWidth) {
              spot++;
              if (spot >= 4) {
                spot = 0;
                value--;
              }
              decay = 0.3;
              vx = 4 * (1 - Math.random() * 2);
              if (vx > 0) vx += 1;
              else vx -= 1;
              vy = 4 * Math.random();
              cx = 450 + spot * 80;
              cy = 10;
            }
            image.onload = () => {
              context.drawImage(
                image,
                value * 71, //Sprite X
                spot * 96, //Sprite Y
                71,
                96,
                Math.round(cx + 0.5), //on screen X
                Math.round(cy + 0.5), //on screen Y
                130,
                175
              );
            };
          };
          draw();
        };
        window.requestAnimationFrame(animate);
        drawCards(context);
      };
      animate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <canvas
      ref={canvasRef}
      id="can"
      width={canvasWidth}
      height={canvasHeight}
      style={{ imageRendering: "pixelated" }}
    />
  );
};
