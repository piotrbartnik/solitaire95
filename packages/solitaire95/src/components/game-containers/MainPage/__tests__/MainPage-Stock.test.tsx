/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { createCards } from "../../../../configs/cardTypes";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";

// jest.useFakeTimers();
const clickUndo = () => {
  fireEvent.click(screen.getByRole("button", { name: "Game" }));
  fireEvent.click(screen.getByRole("button", { name: "Undo" }));
};

describe("render MainPage with custom state for cards on stock", () => {
  let clubsCards;
  let initialState: any;
  beforeEach(() => {
    clubsCards = createCards.filter((card) => card[1] === "clubs").reverse();
    initialState = {
      cardDistribution: {
        cardsOnStock: clubsCards,
        cardsFromStock: [],
        cardsOnPiles: {},
        threeCardsOnTable: [],
      },
      gameState: {
        drawType: "drawThree",
        timerVisible: true,
        bottomBarVisible: true,
      },
    };
  });
  it("and for drawThree and click three cards are added to stock", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".cardFront")).toHaveLength(3);
  });
  it("and for drawThree and double click on ace it is added to foundation", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<MainPage />), {
      ...initialState,
      cardDistribution: {
        cardsOnStock: [
          ["ace", "spades", null, "red", "0"],
          ["ace", "hearts", null, "red", "0"],
          ["ace", "hearts", null, "red", "0"],
        ],
        cardsFromStock: [],
        cardsOnPiles: {},
        threeCardsOnTable: [],
      },
    });

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    fireEvent.doubleClick(
      container.querySelector("div[data-suite='spades']") as Element
    );
    expect(screen.getByText("Score: 10")).toBeVisible();
    expect(
      container.querySelector(".foundation")?.querySelectorAll(".card")
    ).toHaveLength(1);
  });
  it("thre cards can be undone", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".cardFront")).toHaveLength(3);
    expect(container.querySelectorAll(".cardBack")).toHaveLength(10);

    clickUndo();

    expect(container.querySelectorAll(".cardFront")).toHaveLength(0);
    expect(container.querySelectorAll(".cardBack")).toHaveLength(13);
  });
  it("and when ace added to foundation it can be undo back to stock and score is substracted", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<MainPage />), {
      ...initialState,
      cardDistribution: {
        cardsOnStock: [
          ["ace", "spades", null, "red", "0"],
          ["ace", "hearts", null, "red", "0"],
          ["ace", "hearts", null, "red", "0"],
        ],
        cardsFromStock: [],
        cardsOnPiles: {},
        threeCardsOnTable: [],
      },
    });

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".cardFront")).toHaveLength(3);

    fireEvent.doubleClick(
      container.querySelector("div[data-suite='spades']") as Element
    );
    expect(
      container.querySelector(".foundation")?.querySelectorAll(".card")
    ).toHaveLength(1);
    expect(screen.getByText("Score: 10")).toBeVisible();
    clickUndo();
    expect(
      container.querySelector(".foundation")?.querySelector(".card")
    ).toBeFalsy();
    expect(container.querySelectorAll(".cardFront")).toHaveLength(3);
    expect(screen.getByText("Score: 0")).toBeVisible();
  });
});
