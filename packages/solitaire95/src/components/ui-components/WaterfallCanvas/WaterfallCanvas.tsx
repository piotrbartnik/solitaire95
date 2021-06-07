import React, { useRef, useEffect } from "react";
// import king from "../../../static/cardsFronts/clubs/kingOfClubs-min.png";

type WaterfallCanvasPropTypes = {
  canvasWidth: number;
  canvasHeight: number;
};

export const WaterfallCanvas: React.FC<WaterfallCanvasPropTypes> = (props) => {
  const { canvasWidth, canvasHeight } = props;
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

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = (canvas as HTMLCanvasElement).getContext("2d");
      (context as CanvasRenderingContext2D).fillStyle = "#20ac55";
      // context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      // const image = new Image(60, 45);
      // image.src = king;
      // context.drawImage(image, 40, 50);
      drawStockRectangle(context as CanvasRenderingContext2D);
    }
  }, []);
  return (
    <canvas
      ref={canvasRef}
      id="can"
      width={canvasWidth}
      height={canvasHeight}
    />
  );
};
