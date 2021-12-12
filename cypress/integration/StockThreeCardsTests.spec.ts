// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

const stockThreeCardsInitialState = {
  testEnv: true,
  cardDistribution: {
    cardsOnStock: [
      ["ace", "clubs", null, "black", "0"],
      ["ace", "spades", null, "black", "0"],
      ["ace", "hearts", null, "red", "0"],
      ["two", "diamonds", true, "red", "1"],
      ["king", "diamonds", true, "red", "11"],
      ["ace", "diamonds", true, "red", "0"],
    ],
    cardsFromStock: [],
    threeCardsOnTable: [],
    cardsOnPiles: {
      0: [["three", "clubs", true, "black", "2"]],
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
  gameState: {
    drawType: "drawThree",
    cardDeck: "acorns",
    bottomBarVisible: true,
    timerVisible: true,
  },
};

describe("Solitaire stock for three draw", () => {
  beforeEach(() => {
    cy.visit("/");
    window.localStorage.setItem(
      "solitaireState",
      JSON.stringify(stockThreeCardsInitialState)
    );
  });

  it("on card back click three cards are added to stock", () => {
    cy.get("[data-front=false]").should("have.length", 6);
    cy.get("[data-front=false]").first().click({ force: true });
    cy.get("[data-front=false]").should("have.length", 3);
    cy.findByRole("listitem", { name: "king diamonds" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "card stock");
    cy.findByRole("listitem", { name: "two diamonds" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "card stock");
    cy.findByRole("listitem", { name: "ace diamonds" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "card stock");
  });
  it("card can be dragged to foundation", () => {
    cy.get("[data-front=false]").should("have.length", 6);
    cy.get("[data-front=false]").first().click({ force: true });
    cy.get("[data-front=false]").first().click({ force: true });
    cy.findByRole("listitem", { name: "ace clubs" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "card stock");
    cy.findByRole("listitem", { name: "ace clubs" }).drag(
      "list",
      `foundation 0`
    );
    cy.findByRole("listitem", { name: "ace clubs" })
      .parent()
      .parent()
      .should("have.attr", "aria-label", "foundation 0");
    cy.findByText("Score: 10").should("exist");
  });
  it("card can be dragged to pile", () => {
    cy.get("[data-front=false]").first().click({ force: true });
    cy.get("[data-front=false]").first().click({ force: true });
    cy.findByRole("listitem", { name: "ace clubs" }).drag(
      "list",
      `foundation 0`
    );
    cy.findByRole("listitem", { name: "ace spades" }).drag(
      "listitem",
      `two hearts`
    );
    cy.findByText("Score: 15").should("exist");
  });
  it("three cards are shown after all card are used from current 3 stock", () => {
    cy.get("[data-front=false]").first().click({ force: true });
    cy.get("[data-front=false]").first().click({ force: true });
    cy.findByRole("listitem", { name: "ace clubs" }).drag(
      "list",
      `foundation 0`
    );
    cy.findByRole("listitem", { name: "ace spades" }).drag(
      "listitem",
      `two hearts`
    );
    cy.findByRole("listitem", { name: "ace hearts" }).drag(
      "list",
      `foundation 2`
    );
    cy.findByRole("listitem", { name: "king diamonds" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "card stock");
    cy.findByRole("listitem", { name: "two diamonds" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "card stock");
    cy.findByRole("listitem", { name: "ace diamonds" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "card stock");
    cy.findByText("Score: 25").should("exist");
  });
});
