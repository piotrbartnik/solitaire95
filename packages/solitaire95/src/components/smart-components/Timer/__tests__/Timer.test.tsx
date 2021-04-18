import React from "react";
import { act } from "react-dom/test-utils";
import { reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { Timer } from "../Timer";

jest.useFakeTimers();

describe("renders Timer", () => {
  it("and check if it has the single div wrapper", () => {
    const { asFragment } = reduxRtlWrapper(<Timer />);
    expect(asFragment().querySelectorAll("div")).toHaveLength(1);
  });

  it("and it should have time 0 at the beggining", () => {
    const { getByText } = reduxRtlWrapper(<Timer />);
    expect(getByText("Time: 0")).toBeInTheDocument();
  });

  it("and it should have time 5 after five seconds", () => {
    const store = {
      gameState: { gameStarted: true },
      countScore: { points: 0 },
    };
    const { getByText } = reduxRtlWrapper(<Timer />, store);
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(getByText("Time: 5")).toBeInTheDocument();
  });

  it("and it should have time 127 after 127 seconds", () => {
    const initialState = {
      gameState: { gameStarted: true },
      countScore: { points: 0 },
    };
    const { getByText } = reduxRtlWrapper(<Timer />, initialState);
    act(() => {
      jest.advanceTimersByTime(127000);
    });

    expect(getByText("Time: 127")).toBeInTheDocument();
  });
});
