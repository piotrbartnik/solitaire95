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
        cardsOnPiles: { 0: [["ace", "clubs", false, "black", 1]] },
      },
    };
  });
  it("and card when ace is moved to foundation on doble click and points added to score", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );
    fireEvent.doubleClick(container.querySelector(".cardFront") as Element);
    expect(
      container.querySelector(".foundation")?.querySelectorAll(".card")
    ).toHaveLength(1);
    expect(screen.getByText("Score: 10")).toBeVisible();
  });
});
