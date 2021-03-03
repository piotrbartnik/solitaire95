import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { reduxWrapper } from "../../../../helpers/testHelpers";
import { Timer } from "../Timer";

jest.useFakeTimers();
const mockStore = configureStore([]);

describe("renders Timer", () => {
  it("and check if it has the single div wrapper", () => {
    const { asFragment } = render(reduxWrapper(<Timer />));
    expect(asFragment().querySelectorAll("div")).toHaveLength(1);
  });

  it("and it should have time 0 at the beggining", () => {
    const { getByText } = render(reduxWrapper(<Timer />));
    expect(getByText("Time: 0")).toBeInTheDocument();
  });

  // fix after adding start time after first move

  it("and it should have time 5 after five seconds", () => {
    const store = mockStore({
      gameState: { gameStarted: true },
      countScore: { points: 0 },
    });
    const { getByText } = render(
      <Provider store={store}>
        <Timer />
      </Provider>
    );
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(getByText("Time: 5")).toBeInTheDocument();
  });

  it("and it should have time 127 after 127 seconds", () => {
    const store = mockStore({
      gameState: { gameStarted: true },
      countScore: { points: 0 },
    });
    const { getByText } = render(
      <Provider store={store}>
        <Timer />
      </Provider>
    );
    act(() => {
      jest.advanceTimersByTime(127000);
    });

    expect(getByText("Time: 127")).toBeInTheDocument();
  });
});
