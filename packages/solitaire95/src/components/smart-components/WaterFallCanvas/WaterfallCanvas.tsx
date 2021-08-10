import React, { useRef, useState, useCallback } from "react";
import { connect } from "react-redux";
import {
  useRunWaterfallAnimation,
  useCancelCanvasAnimation,
} from "./WaterfallHooks";
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

  const cancelCardAnimation = useCallback(
    (animation: number, context: CanvasRenderingContext2D) => {
      window.cancelAnimationFrame(animation);
      toggleDealWindow(true, "dealAgainWindow");
      context?.clearRect(0, 0, context.canvas.width, context.canvas.height);
      setRenderCanvas(false);
    },
    [toggleDealWindow]
  );

  useCancelCanvasAnimation(
    cancelCardAnimation,
    startAnimationState,
    contextState
  );

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
      // -1 to properly show game container bottom border
      height={canvasHeight - 1}
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
