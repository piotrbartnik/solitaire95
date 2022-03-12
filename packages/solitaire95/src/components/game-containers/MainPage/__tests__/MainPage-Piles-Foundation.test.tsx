/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";

describe("render MainPage with custom state for cards on piles ", () => {
  let initialState: any;
  beforeEach(() => {
    initialState = {
      cardDistribution: {
        cardsOnStock: [],
        cardsFromStock: [],
        cardsOnPiles: {
          0: [["ace", "clubs", undefined, "black", 1]],
          1: [["ace", "clubs", undefined, "black", 1]],
        },
      },
    };
  });
  it("and card on first pile is visible on default and if ace is moved to foundation on doble click and points added to score", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );
    fireEvent.doubleClick(container.querySelector(".card__front") as Element);
    expect(
      container.querySelector(".foundation")?.querySelectorAll(".card")
    ).toHaveLength(1);
    expect(screen.getByText("Score: 10")).toBeVisible();
  });
  it("and card on 2 pile is turned back, can be turned front, and can't be turned back again", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );
    expect(container.querySelectorAll(".card__front")).toHaveLength(1);
    expect(container.querySelectorAll(".card__back")).toHaveLength(1);
    fireEvent.click(container.querySelector(".card__back") as Element);
    expect(container.querySelectorAll(".card__front")).toHaveLength(2);
    expect(container.querySelectorAll(".card__back")).toHaveLength(0);
    fireEvent.click(container.querySelector(".card__front") as Element);
    expect(container.querySelectorAll(".card__back")).toHaveLength(0);
  });
});
