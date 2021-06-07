import React, { useRef, useEffect } from "react";
// import king from "../../../static/cardsFronts/clubs/kingOfClubs-min.png";

type WaterfallCanvasPropTypes = {
  canvasWidth: number;
  canvasHeight: number;
};

export const WaterfallCanvas: React.FC<WaterfallCanvasPropTypes> = (props) => {
  const { canvasWidth, canvasHeight } = props;
  const canvasRef = useRef(null);

  const drawStocRectangle = (context: CanvasRenderingContext2D) => {
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(143, 187);
    context.arcTo(19, 187, 0, 0, 7);
    context.arcTo(19, 12, 149, 0, 7);
    context.arcTo(149, 12, 149, 187, 7);
    context.arcTo(149, 187, 0, 187, 7);
    context.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = (canvas as HTMLCanvasElement).getContext("2d");
      //Our first draw
      (context as CanvasRenderingContext2D).fillStyle = "#20ac55";
      // context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      // const image = new Image(60, 45);
      // image.src = king;
      // context.drawImage(image, 40, 50);
      drawStocRectangle(context as CanvasRenderingContext2D);
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
