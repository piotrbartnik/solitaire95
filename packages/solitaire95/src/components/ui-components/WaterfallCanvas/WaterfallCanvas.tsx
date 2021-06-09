import React, { useRef, useEffect } from "react";
import sprite from "./cards-sprite.png";

type WaterfallCanvasPropTypes = {
  canvasWidth: number;
  canvasHeight: number;
  foundationsOrder: string[];
};

export const WaterfallCanvas: React.FC<WaterfallCanvasPropTypes> = (props) => {
  const { canvasWidth, canvasHeight, foundationsOrder } = props;
  console.log(foundationsOrder);
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
    const image = new Image();
    image.src = sprite;
    image.onload = () =>
      context.drawImage(
        image,
        12 * 71, //Sprite X
        1 * 96, //Sprite Y
        71,
        96,
        200, //on screen X
        12, //on screen Y
        130,
        175
      );
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
    }
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
