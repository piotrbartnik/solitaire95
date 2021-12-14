// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

const fullGameInitialState = {
  testEnv: true,
  cardDistribution: {
    cardsOnStock: [
      ["two", "diamonds", true, "red", "1"],
      ["king", "diamonds", true, "red", "11"],
    ],
    cardsFromStock: [["ace", "diamonds", true, "red", "0"]],
    threeCardsOnTable: [],
    cardsOnPiles: {
      0: [],
      1: [["two", "clubs", true, "black", "1"]],
      2: [["two", "hearts", true, "red", "1"]],
      3: [],
      4: [],
      5: [],
      6: [],
    },
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
