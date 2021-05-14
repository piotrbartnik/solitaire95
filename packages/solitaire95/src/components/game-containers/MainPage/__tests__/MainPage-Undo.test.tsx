/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";

const clickUndo = () => {
  fireEvent.click(screen.getByRole("button", { name: "Game" }));
  fireEvent.click(screen.getByRole("button", { name: "Undo" }));
};

describe("render MainPage with custom state for undo testing", () => {
  let initialState: any;
  beforeEach(() => {
    initialState = {
      cardDistribution: {
        cardsOnStock: [],
        cardsFromStock: [["ace", "clubs", undefined, "black", 1]],
        cardsOnPiles: {},
      },
    };
  });
  it("and when ace added to foundation it can be undo back to stock and score is substracted", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.doubleClick(container.querySelector(".cardFront") as Element);
    expect(
      container.querySelector(".foundation")?.querySelector(".card")
    ).toBeVisible();
    expect(screen.getByText("Score: 10")).toBeVisible();
    clickUndo();
    expect(
      container.querySelector(".foundation")?.querySelector(".card")
    ).toBeFalsy();
    expect(screen.getByText("Score: 0")).toBeVisible();
  });
});
