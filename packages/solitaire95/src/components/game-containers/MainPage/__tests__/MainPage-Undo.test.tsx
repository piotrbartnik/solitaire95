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
  const stockToFoundationState = {
    cardDistribution: {
      cardsOnStock: [],
      cardsFromStock: [["ace", "clubs", undefined, "black", 1]],
      cardsOnPiles: {},
    },
  };
  const cardsOnStockMove = {
    cardDistribution: {
      cardsOnStock: [["ace", "clubs", undefined, "black", 1]],
      cardsFromStock: [],
      cardsOnPiles: {},
      threeCardsOnTable: [],
    },
    gameState: { drawType: "drawOne" },
  };
  const fromPileToFoundation = {
    cardDistribution: {
      cardsOnStock: [],
      cardsFromStock: [],
      cardsOnPiles: { 0: [["ace", "clubs", true, "black", 1]] },
    },
  };
  it("and when ace added to cards from stock that action can be undone", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      cardsOnStockMove
    );

    fireEvent.click(container.querySelector(".cardBack") as Element);
    expect(container.querySelectorAll(".cardBack")).toHaveLength(0);
    expect(container.querySelectorAll(".cardFront")).toHaveLength(1);

    clickUndo();

    expect(container.querySelectorAll(".cardFront")).toHaveLength(0);
    expect(container.querySelectorAll(".cardBack")).toHaveLength(1);
  });
  it("and when ace added to foundation it can be undo back to stock and score is substracted", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      stockToFoundationState
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
  it("and when ace added to foundation from pile that action can be undone and score is substracted", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      fromPileToFoundation
    );

    fireEvent.doubleClick(container.querySelector(".cardFront") as Element);
    expect(
      container.querySelector(".foundation")?.querySelectorAll(".card")
    ).toHaveLength(1);
    expect(screen.getByText("Score: 10")).toBeVisible();

    clickUndo();

    expect(
      container.querySelector(".foundation")?.querySelectorAll(".card")
    ).toHaveLength(0);
    expect(screen.getByText("Score: 0")).toBeVisible();
  });
});
