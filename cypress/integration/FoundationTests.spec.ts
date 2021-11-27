// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

const foundationTestsInitialState = {
  testEnv: true,
  cardDistribution: {
    cardsOnStock: [],
    cardsFromStock: [],
    threeCardsOnTable: [],
    cardsOnPiles: { 0: [] },
  },
  cardsOnFoundation: {
    cardsOnFirstFoundation: {
      foundationSuite: "diamonds",
      cards: [["ace", "diamonds", true, "red", "0"]],
    },
    cardsOnSecondFoundation: {
      cards: [["ace", "spades", true, "black", "0"]],
      foundationSuite: "spades",
    },
    cardsOnThirdFoundation: {
      cards: [],
    },
    cardsOnFourthFoundation: {
      cards: [],
    },
  },
  stockCounter: { stockRevolutions: 0 },
  timeCounter: { initialTime: 0, scoreTime: 0 },
};

describe("Solitaire foundations", () => {
  beforeEach(() => {
    cy.visit("/");
    window.localStorage.setItem(
      "solitaireState",
      JSON.stringify(foundationTestsInitialState)
    );
  });

  it("cards can be dragger between foundations", () => {
    cy.findByRole("listitem", { name: "ace diamonds" })
      .parent()
      .parent()
      .should("have.attr", "aria-label", "foundation 0");
    cy.findByRole("listitem", { name: "ace diamonds" }).drag(
      "list",
      `foundation 2`
    );
    cy.findByRole("listitem", { name: "ace diamonds" })
      .parent()
      .parent()
      .should("have.attr", "aria-label", "foundation 2");
    cy.findByRole("listitem", { name: "ace spades" })
      .parent()
      .parent()
      .should("have.attr", "aria-label", "foundation 1");
    cy.findByRole("listitem", { name: "ace spades" }).drag(
      "list",
      `foundation 3`
    );
    cy.findByRole("listitem", { name: "ace spades" })
      .parent()
      .parent()
      .should("have.attr", "aria-label", "foundation 3");
    cy.findByRole("listitem", { name: "ace diamonds" }).drag(
      "list",
      `foundation 1`
    );
    cy.findByRole("listitem", { name: "ace diamonds" })
      .parent()
      .parent()
      .should("have.attr", "aria-label", "foundation 1");
  });
});
