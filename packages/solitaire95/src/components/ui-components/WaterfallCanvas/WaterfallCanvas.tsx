import React, { useRef, useEffect } from "react";
import king from "../../../static/cardsFronts/clubs/kingOfClubs-min.png";

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
      const image = new Image(60, 45);
      image.src = king;
      context.drawImage(image, 40, 50);
    }
  }, []);
  return <canvas ref={canvasRef} id="can" />;
};
