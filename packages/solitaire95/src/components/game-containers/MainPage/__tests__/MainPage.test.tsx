/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { createCards } from "../../../../configs/cardTypes";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";

jest.useFakeTimers();

describe("render MainPage with custom state for cards on stock", () => {
  let clubsCards;
  let preloadedState: any;
  beforeEach(() => {
    clubsCards = createCards.filter((card) => card[1] === "clubs").reverse();
    preloadedState = {
      cardDistribution: {
        cardsOnStock: clubsCards,
        cardsFromStock: [],
        cardsOnPiles: {},
      },
    };
  });
  it("and ace is added to first empty foundation on double click and score updated to 10", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<MainPage />), {
      initialState: preloadedState,
    });

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    fireEvent.doubleClick(container.querySelector(".cardFront") as Element);
    expect(
      container.querySelector(".foundation")?.querySelector(".card")
    ).toBeVisible();
    expect(screen.getByText("Score: 10")).toBeVisible();
  });
  it("and when two is added to foundation with ace on double click and score updated to 20 after 10 seconds score is downed to 18 and after 30 to 14 points", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<MainPage />), {
      initialState: preloadedState,
    });

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    fireEvent.doubleClick(container.querySelector(".cardFront") as Element);

    expect(
      container.querySelector(".foundation")?.querySelectorAll(".card")
    ).toHaveLength(1);
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(screen.getByText("Score: 8")).toBeVisible();
    act(() => {
      jest.advanceTimersByTime(20000);
    });
    expect(screen.getByText("Score: 4")).toBeVisible();
  });
  it("and ace is added to first empty foundation on double click and score updated to 10", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<MainPage />), {
      initialState: preloadedState,
    });
    for (let i = 0; i < 13; i++) {
      fireEvent.click(
        container.querySelector(".cardStock__cardHolder") as Element
      );
      fireEvent.doubleClick(container.querySelector(".cardFront") as Element);
    }
    expect(
      container.querySelector(".foundation")?.querySelectorAll(".card")
    ).toHaveLength(13);
    expect(screen.getByText("Score: 130")).toBeVisible();
  });
});
