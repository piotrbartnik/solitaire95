import React, { useRef, useEffect } from "react";

export const WaterfallCanvas: React.FC = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas = canvasRef.current as any;
    if (canvas) {
      const context = canvas.getContext("2d");
      //Our first draw
      context.fillStyle = "#20ac55";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
  }, []);
  return <canvas ref={canvasRef} id="can" />;
};
