// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

import { createCards } from "../../packages/solitaire95/src/configs/cardTypes";
import { orderPiles } from "../../packages/solitaire95/src/store/actions/cardActions";

const clubsCards = createCards.filter((card) => card[1] === "clubs").reverse();
const heartsCards = createCards
  .filter((card) => card[1] === "hearts")
  .reverse();
const diamondsCards = createCards
  .filter((card) => card[1] === "diamonds")
  .reverse();
const spadesCards = createCards
  .filter((card) => card[1] === "spades")
  .reverse();
const cardsOnPiles = orderPiles([
  ...heartsCards.slice(11),
  ...diamondsCards,
  ...spadesCards,
]);

const fullGameInitialState = {
  testEnv: true,
  cardDistribution: {
    cardsOnStock: [...clubsCards, ...heartsCards.slice(0, 11)],
    cardsFromStock: [],
    threeCardsOnTable: [],
    cardsOnPiles: cardsOnPiles,
  },
  stockCounter: { stockRevolutions: 0 },
  timeCounter: { initialTime: 0, scoreTime: 0 },
};

describe("Solitaire full game test", () => {
  beforeEach(() => {
    cy.visit("/");
    window.localStorage.setItem(
      "solitaireState",
      JSON.stringify(fullGameInitialState)
    );
  });

  it("game can be finished", () => {
    cy.findByRole("listitem", { name: "ace clubs" }).should(
      "have.attr",
      "data-pilenumber",
      3
    );
    cy.findByRole("listitem", { name: "ace clubs" }).drag(
      "listitem",
      "two diamonds"
    );
    cy.findByRole("listitem", { name: "ace clubs" }).should(
      "have.attr",
      "data-pilenumber",
      4
    );
  });
});
