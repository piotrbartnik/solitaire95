/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";
import { createCards } from "../../../../configs/cardTypes";

const filterCards = (suite: string): (string | number | undefined)[][] =>
  createCards.filter((card) => card[1] === suite);

const spades = filterCards("spades");
spades.pop();

const lastKingToMove = [["king", "spades", undefined, "black", 12]];
const initialState = {
  cardDistribution: {
    cardsOnStock: [],
    cardsFromStock: lastKingToMove,
    cardsOnPiles: {},
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
};

describe("render MainPage for Deal again window testing", () => {
  it("when 52 card appears on foundations deal window will appear", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );
    fireEvent.doubleClick(container.querySelector(".cardFront") as Element);
    expect(screen.getByText("Deal again?")).toBeVisible();
  });
  it("when no clicked cards are not dealt again", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.doubleClick(container.querySelector(".cardFront") as Element);
    fireEvent.click(screen.getByText("No"));

    expect(
      container.querySelectorAll("div[data-foundationnumber]")
    ).toHaveLength(52);
    expect(screen.queryByText("Deal again?")).toBeNull();
  });
  it("when x clicked cards are not dealt again", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.doubleClick(container.querySelector(".cardFront") as Element);
    fireEvent.click(screen.getByRole("button", { name: "close window" }));

    expect(
      container.querySelectorAll("div[data-foundationnumber]")
    ).toHaveLength(52);

    expect(screen.queryByText("Deal again?")).toBeNull();
  });
  it("when yes clicked cards are dealt again", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.doubleClick(container.querySelector(".cardFront") as Element);
    fireEvent.click(screen.getByText("Yes"));

    expect(
      container.querySelectorAll("div[data-foundationnumber]")
    ).toHaveLength(0);
    expect(screen.queryByText("Deal again?")).toBeNull();
  });
});
