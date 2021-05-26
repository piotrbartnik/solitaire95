import React, { useRef, useEffect } from "react";

type WaterfallCanvasPropTypes = {
  canvasWidth: number;
  canvasHeight: number;
};

export const WaterfallCanvas: React.FC<WaterfallCanvasPropTypes> = (props) => {
  const { canvasWidth, canvasHeight } = props;

  const canvasRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas = canvasRef.current as any;
    if (canvas) {
      const context = canvas.getContext("2d");
      //Our first draw
      context.fillStyle = "#64ac55";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
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
