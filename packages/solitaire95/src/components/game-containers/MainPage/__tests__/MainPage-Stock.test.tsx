import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { createCards } from "../../../../configs/cardTypes";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";

const clickUndo = () => {
  fireEvent.click(screen.getByRole("button", { name: "Game" }));
  fireEvent.click(screen.getByRole("button", { name: "Undo" }));
};

const clubsCards = createCards.filter((card) => card[1] === "clubs").reverse();

const initialState = {
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

const initialStateWitcAces = {
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
};

describe("render MainPage with custom state for cards on stock", () => {
  it("and for drawThree and click on stock three cards are added to the table", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".cardFront")).toHaveLength(3);
  });
  it("and double click on ace, it is added to foundation", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialStateWitcAces
    );

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
  it("thre cards move on stock can be undone", () => {
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
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialStateWitcAces
    );

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
