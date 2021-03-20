import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { rootReducer } from "../../../../store/reducers";
import { dndWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";

jest.useFakeTimers();

const testAceCardStock = [["ace", "clubs", undefined, "black", 1]];

const preloadedState = {
  cardDistribution: {
    cardsOnStock: testAceCardStock,
    cardsFromStock: [],
    cardsOnPiles: {},
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = createStore(rootReducer, preloadedState as any);

describe("render MainPage with custom state", () => {
  it("and ace is added to first empty foundation on double click and score updated to 10", () => {
    const { container } = render(
      dndWrapper(
        <Provider store={store}>
          <MainPage />
        </Provider>
      )
    );

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    fireEvent.doubleClick(container.querySelector(".cardFront") as Element);
    expect(
      container.querySelector(".foundation")?.querySelector(".card")
    ).toBeVisible();
    expect(screen.getByText("Score: 10")).toBeVisible();
  });
  it("and when ace is added to first empty foundation on double click and score updated to 10 after 10 seconds score is downed to 8 and after 30 to 4 points", () => {
    const { container } = render(
      dndWrapper(
        <Provider store={store}>
          <MainPage />
        </Provider>
      )
    );

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    fireEvent.doubleClick(container.querySelector(".cardFront") as Element);
    expect(
      container.querySelector(".foundation")?.querySelector(".card")
    ).toBeVisible();
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(screen.getByText("Score: 8")).toBeVisible();
    act(() => {
      jest.advanceTimersByTime(20000);
    });
    expect(screen.getByText("Score: 4")).toBeVisible();
  });
});
