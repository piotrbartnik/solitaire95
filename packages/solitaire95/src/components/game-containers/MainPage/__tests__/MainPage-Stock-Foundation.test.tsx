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
        drawType: "drawOne",
        timerVisible: true,
        bottomBarVisible: true,
      },
    };
  });
  it("and ace is added to first empty foundation on double click and score updated to 10", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    fireEvent.doubleClick(container.querySelector(".card__front") as Element);
    expect(
      container.querySelector(".foundation")?.querySelector(".card")
    ).toBeVisible();
    expect(screen.getByText("Score: 10")).toBeVisible();
  });
  it("and score is updated to 10 then after 10 seconds score is downed to 8 and after 30 to 4 points", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    fireEvent.doubleClick(container.querySelector(".card__front") as Element);

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
  it("and all cards from one suite can be added to foundation from card stock", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );
    for (let i = 0; i < 13; i++) {
      fireEvent.click(
        container.querySelector(".cardStock__cardHolder") as Element
      );
      fireEvent.doubleClick(container.querySelector(".card__front") as Element);
    }
    expect(
      container.querySelector(".foundation")?.querySelectorAll(".card")
    ).toHaveLength(13);
    expect(screen.getByText("Score: 130")).toBeVisible();
  });
  it("and when there are 4 aces each of them will be added to new foundation and score set to 40", () => {
    const fourAcesCards = [
      ["ace", "clubs", undefined, "black", 1],
      ["ace", "spades", undefined, "black", 1],
      ["ace", "hearts", undefined, "red", 1],
      ["ace", "diamonds", undefined, "red", 1],
    ];
    initialState = {
      cardDistribution: {
        cardsOnStock: fourAcesCards.slice(),
        cardsFromStock: [],
        cardsOnPiles: {},
        threeCardsOnTable: [],
      },
      gameState: {
        drawType: "drawOne",
        timerVisible: true,
        bottomBarVisible: true,
      },
    };
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );
    const foundations = container.querySelectorAll(".foundation");
    for (let i = 0; i < 4; i++) {
      fireEvent.click(
        container.querySelector(".cardStock__cardHolder") as Element
      );
      fireEvent.doubleClick(container.querySelector(".card__front") as Element);
    }

    foundations.forEach((foundation: HTMLDivElement, index: number) => {
      expect(
        foundation.querySelectorAll(
          `div[data-suite='${fourAcesCards[3 - index][1]}']`
        )
      ).toHaveLength(1);
    });
    expect(screen.getByText("Score: 40")).toBeVisible();
  });

  const stockResetState = {
    cardDistribution: {
      cardsOnStock: [["ace", "clubs", undefined, "black", 1]],
      cardsFromStock: [],
      cardsOnPiles: {},
      threeCardsOnTable: [],
    },
    countScore: { points: 150 },
    gameState: {
      drawType: "drawOne",
      timerVisible: true,
      bottomBarVisible: true,
    },
  };
  it("after second and more stok count 100 points is substracted from score", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      stockResetState
    );

    for (let i = 0; i < 4; i++) {
      fireEvent.click(
        container.querySelector(".cardStock__cardHolder") as Element
      );
    }

    expect(screen.getByText("Score: 50")).toBeVisible();

    for (let i = 0; i < 2; i++) {
      fireEvent.click(
        container.querySelector(".cardStock__cardHolder") as Element
      );
    }

    expect(screen.getByText("Score: 0")).toBeVisible();
  });
});
