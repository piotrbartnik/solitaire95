/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";
import { createCards } from "../../../../configs/cardTypes";
import { cardConfigType } from "../../../../configs/cardTypes";

jest.useFakeTimers();

const filterCards = (suite: string): cardConfigType[] =>
  createCards.filter((card) => card[1] === suite);

const spades = filterCards("spades");
spades.pop();

const lastKingToMove = [["king", "spades", undefined, "black", 12]];
const initialState = {
  cardDistribution: {
    cardsOnStock: [],
    cardsFromStock: lastKingToMove,
    cardsOnPiles: {},
    threeCardsOnTable: [],
  },
  cardsOnFoundation: {
    cardsOnFirstFoundation: {
      foundationSuite: "diamonds",
      cards: filterCards("diamonds"),
    },
    cardsOnSecondFoundation: {
      foundationSuite: "clubs",
      cards: filterCards("clubs"),
    },
    cardsOnThirdFoundation: {
      foundationSuite: "hearts",
      cards: filterCards("hearts"),
    },
    cardsOnFourthFoundation: {
      foundationSuite: "spades",
      cards: spades,
    },
  },
  gameState: {
    gameStarted: true,
    bottomBarVisible: true,
    timerVisible: true,
    drawType: "drawOne",
    scoreType: "standard",
  },
  timeCounter: { scoreTime: 500 },
};

describe("render MainPage for Deal again window testing", () => {
  it("when 52 card appears on foundations deal window will appear", async () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );
    fireEvent.doubleClick(container.querySelector(".card__front") as Element);
    await waitFor(() => fireEvent.click(container.querySelector("canvas")));

    expect(screen.getByText("Deal again?")).toBeVisible();
  });
  it("when no clicked cards are not dealt again", async () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.doubleClick(container.querySelector(".card__front") as Element);
    await waitFor(() => fireEvent.click(container.querySelector("canvas")));
    fireEvent.click(screen.getByText("No"));

    expect(
      container.querySelectorAll("div[data-foundationnumber]")
    ).toHaveLength(0);
    expect(screen.queryByText("Deal again?")).toBeNull();
  });
  it("when x clicked cards are not dealt again", async () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.doubleClick(container.querySelector(".card__front") as Element);
    await waitFor(() => fireEvent.click(container.querySelector("canvas")));
    fireEvent.click(
      screen.getByRole("button", { name: "Solitaire close button" })
    );

    expect(
      container.querySelectorAll("div[data-foundationnumber]")
    ).toHaveLength(0);

    expect(screen.queryByText("Deal again?")).toBeNull();
  });
  it("when yes clicked cards are dealt again", async () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.doubleClick(container.querySelector(".card__front") as Element);
    await waitFor(() =>
      fireEvent.keyDown(container.querySelector("canvas"), {
        key: "Escape",
        code: "Escape",
      })
    );
    fireEvent.click(screen.getByText("Yes"));

    expect(
      container.querySelectorAll("div[data-foundationnumber]")
    ).toHaveLength(0);
    expect(screen.queryByText("Deal again?")).toBeNull();
    expect(screen.getByText(/Score: 0/)).toBeVisible();
    expect(screen.getByText(/Time: 0/)).toBeVisible();
  });
  it("when game is finished appropriate score is added based on time needed to finish the game", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );
    fireEvent.doubleClick(container.querySelector(".card__front") as Element);
    expect(screen.getByText(/Score: 1410/)).toBeTruthy();
  });
});
