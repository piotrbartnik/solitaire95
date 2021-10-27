/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { createCards } from "../../../../configs/cardTypes";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";

// jest.useFakeTimers();

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
});
