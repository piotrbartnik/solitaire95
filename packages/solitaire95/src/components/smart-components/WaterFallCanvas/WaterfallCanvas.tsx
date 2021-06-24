import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRunWaterfallAnimation } from "./WaterfallHooks";
import { toggleWindow } from "../../../store/actions/";

type WaterfallCanvasPropTypes = {
  canvasWidth: number;
  canvasHeight: number;
  foundationsOrder: [string, number][];
};

type WaterfallCanvasDispatchTypes = {
  toggleDealWindow: (state: boolean, window: string) => void;
};

const WaterfallCanvasInternal: React.FC<
  WaterfallCanvasDispatchTypes & WaterfallCanvasPropTypes
> = (props) => {
  const { canvasWidth, canvasHeight, foundationsOrder, toggleDealWindow } =
    props;
  const [contextState, setContext] = useState<CanvasRenderingContext2D>();
  const [startAnimationState, setStartAnimation] = useState<number>();
  const [renderCanvas, setRenderCanvas] = useState(true);

  const canvasRef = useRef(null);

  const cancelCardAnimation = (
    animation: number,
    context: CanvasRenderingContext2D
  ) => {
    window.cancelAnimationFrame(animation);
    toggleDealWindow(true, "dealAgainWindow");
    context?.clearRect(0, 0, context.canvas.width, context.canvas.height);
    setRenderCanvas(false);
  };

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

  useRunWaterfallAnimation(
    canvasRef,
    foundationsOrder,
    setContext,
    canvasHeight,
    canvasWidth,
    setStartAnimation,
    cancelCardAnimation
  );

  return renderCanvas ? (
    <canvas
      ref={canvasRef}
      id="can"
      width={canvasWidth}
      height={canvasHeight}
      style={{ imageRendering: "pixelated" }}
      onClick={() =>
        cancelCardAnimation(
          startAnimationState as number,
          contextState as CanvasRenderingContext2D
        )
      }
    />
  ) : (
    <></>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleDealWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
  };
};

export const WaterfallCanvas = connect<
  undefined,
  WaterfallCanvasDispatchTypes,
  WaterfallCanvasPropTypes
>(
  undefined,
  mapDispatchToProps
)(WaterfallCanvasInternal);
