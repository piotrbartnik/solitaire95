/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent } from "@testing-library/react";
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
  it("aand for drawThree and click three cards are added to stock", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".cardFront")).toHaveLength(3);
  });
});
