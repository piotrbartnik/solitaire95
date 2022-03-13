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
const fullCardsStock = createCards.slice(0, 24);

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
      ["ace", "diamonds", null, "black", "0"],
      ["ace", "hearts", null, "red", "0"],
    ],
    cardsFromStock: [
      ["two", "spades", null, "red", "0"],
      ["two", "diamonds", null, "black", "0"],
      ["two", "hearts", null, "red", "0"],
    ],
    cardsOnPiles: {},
    threeCardsOnTable: [],
  },
};

const fullCardsStockState = {
  ...initialState,
  cardDistribution: {
    cardsOnStock: fullCardsStock,
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
    expect(container.querySelectorAll(".card__front")).toHaveLength(3);
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
  it("and all thre cards can be added to foundation and then subsequent 3 cards added previously to table will be shown", () => {
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
    expect(container.querySelectorAll(".foundation .card")).toHaveLength(1);
    fireEvent.doubleClick(
      container.querySelector("div[data-suite='diamonds']") as Element
    );
    expect(screen.getByText("Score: 20")).toBeVisible();
    expect(container.querySelectorAll(".foundation .card")).toHaveLength(2);
    expect(
      container.querySelector("div[data-card='two']") as Element
    ).toBeNull();
    fireEvent.doubleClick(
      container.querySelector("div[data-suite='hearts']") as Element
    );
    expect(screen.getByText("Score: 30")).toBeVisible();
    expect(container.querySelectorAll(".foundation .card")).toHaveLength(3);
    expect(
      container.querySelectorAll("div[data-cardname='two']") as Element
    ).toHaveLength(3);
  });
  it("three cards move on stock can be undone", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".card__front")).toHaveLength(3);
    expect(container.querySelectorAll(".card__back")).toHaveLength(10);

    clickUndo();

    expect(container.querySelectorAll(".card__front")).toHaveLength(0);
    expect(container.querySelectorAll(".card__back")).toHaveLength(13);
  });
  it("three cards reverse on stock can be undone", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".card__front")).toHaveLength(1);
    expect(container.querySelectorAll(".card__back")).toHaveLength(0);

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );

    expect(container.querySelectorAll(".card__front")).toHaveLength(0);
    expect(container.querySelectorAll(".card__back")).toHaveLength(13);

    clickUndo();

    expect(container.querySelectorAll(".card__front")).toHaveLength(1);
    expect(container.querySelectorAll(".card__back")).toHaveLength(0);
  });
  it("and when ace added to foundation it can be undo back to stock and score is substracted", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialStateWitcAces
    );

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".card__front")).toHaveLength(3);

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
    expect(container.querySelectorAll(".card__front")).toHaveLength(3);
    expect(screen.getByText("Score: 0")).toBeVisible();
  });
  it("proper cards actions are made on subsequent stock clicks", () => {
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      fullCardsStockState
    );

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".card__front")).toHaveLength(3);
    expect(container.querySelectorAll(".card__back")).toHaveLength(21);
    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".card__front")).toHaveLength(3);
    expect(container.querySelectorAll(".card__back")).toHaveLength(18);
    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".card__front")).toHaveLength(3);
    expect(container.querySelectorAll(".card__back")).toHaveLength(15);
    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".card__front")).toHaveLength(3);
    expect(container.querySelectorAll(".card__back")).toHaveLength(12);
    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".card__front")).toHaveLength(3);
    expect(container.querySelectorAll(".card__back")).toHaveLength(9);
    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".card__front")).toHaveLength(3);
    expect(container.querySelectorAll(".card__back")).toHaveLength(6);
    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".card__front")).toHaveLength(3);
    expect(container.querySelectorAll(".card__back")).toHaveLength(3);
    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".card__front")).toHaveLength(3);
    expect(container.querySelectorAll(".card__back")).toHaveLength(0);
    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".card__front")).toHaveLength(0);
    expect(container.querySelectorAll(".card__back")).toHaveLength(24);
  });

  it("vegas holder is shown for draw one type when all cards clicked once", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<MainPage />), {
      ...initialStateWitcAces,
      gameState: { scoreType: "vegas", drawType: "drawOne" },
    });
    for (let i = 0; i < 4; i++) {
      fireEvent.click(
        container.querySelector(".cardStock__cardHolder") as Element
      );
    }

    expect(container.querySelector(".vegasHolder")).toBeVisible();
  });

  it("vegas holder is shown for draw three type when all cards clicked once", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<MainPage />), {
      ...initialStateWitcAces,
      gameState: { scoreType: "vegas", drawType: "drawThree" },
      stockCounter: { stockRevolutions: 0 },
    });
    for (let i = 0; i < 5; i++) {
      fireEvent.click(
        container.querySelector(".cardStock__cardHolder") as Element
      );
    }

    expect(container.querySelector(".vegasHolder")).toBeVisible();
  });
});
