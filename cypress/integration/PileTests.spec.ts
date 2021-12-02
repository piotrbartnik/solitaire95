// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

const pileTestsInitialState = {
  testEnv: true,
  cardDistribution: {
    cardsOnStock: [],
    cardsFromStock: [],
    threeCardsOnTable: [],
    cardsOnPiles: {
      0: [["ace", "spades", null, "black", "0"]],
      1: [[], ["ace", "hearts", null, "red", "0"]],
      2: [[], [], ["ace", "diamonds", null, "red", "0"]],
      3: [
        [],
        [],
        ["three", "clubs", null, "black", "2"],
        ["ace", "clubs", null, "black", "0"],
      ],
      4: [[], [], [], [], ["two", "diamonds", null, "red", "1"]],
      6: [],
    },
  },
  stockCounter: { stockRevolutions: 0 },
  timeCounter: { initialTime: 0, scoreTime: 0 },
};

const clickUndo = () => {
  cy.findByRole("button", { name: "Game" }).click();
  cy.findByRole("button", { name: "Undo" }).click();
};

describe("Solitaire piles", () => {
  beforeEach(() => {
    cy.visit("/");
    window.localStorage.setItem(
      "solitaireState",
      JSON.stringify(pileTestsInitialState)
    );
  });

  it("aces can be moved to foundations and for each ace added to foundation 10 points are added", () => {
    for (let i = 0; i < 4; i++) {
      const pile = pileTestsInitialState.cardDistribution.cardsOnPiles[i];
      const cardName = `${pile[i][0]} ${pile[i][1]}`;
      cy.findByRole("listitem", { name: cardName }).drag(
        "list",
        `foundation ${i}`
      );
      cy.findByRole("listitem", { name: cardName })
        .parent()
        .parent()
        .should("have.attr", "aria-label", `foundation ${i}`);
      cy.findByText(`Score: ${10 * (i + 1)}`).should("exist");
    }
  });

  it("aces can be moved to higher card on pile", () => {
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
  it("card can not be moved to higher card with the same color", () => {
    cy.findByRole("listitem", { name: "ace diamonds" }).should(
      "have.attr",
      "data-pilenumber",
      2
    );
    cy.findByRole("listitem", { name: "ace diamonds" }).drag(
      "listitem",
      "two diamonds"
    );
    cy.findByRole("listitem", { name: "ace diamonds" }).should(
      "have.attr",
      "data-pilenumber",
      2
    );
  });
  it("turned back card after card on top dragged can be turned front and points are added and can be undone", () => {
    cy.findByRole("listitem", { name: "ace clubs" }).drag(
      "listitem",
      "two diamonds"
    );
    cy.get("[data-pilenumber=3][data-positiononpile=2]").click();
    cy.findByRole("listitem", { name: "three clubs" }).should("exist");
    cy.findByText("Score: 5").should("exist");
  });
  it("card dragged from pile to pile can be undone", () => {
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
    clickUndo();
    cy.findByRole("listitem", { name: "ace clubs" }).should(
      "have.attr",
      "data-pilenumber",
      3
    );
  });
  it("card dragged from pile to foundation can be undone", () => {
    cy.findByRole("listitem", { name: "ace clubs" }).drag(
      "list",
      `foundation 0`
    );
    cy.findByRole("listitem", { name: "ace clubs" })
      .parent()
      .parent()
      .should("have.attr", "aria-label", "foundation 0");
    cy.findByText("Score: 10").should("exist");
    clickUndo();
    cy.findByText("Score: 0").should("exist");
    cy.findByRole("listitem", { name: "ace clubs" }).should(
      "have.attr",
      "data-pilenumber",
      3
    );
  });

  const dragMultipleCards = () => {
    cy.findByRole("listitem", { name: "ace clubs" }).drag(
      "listitem",
      "two diamonds"
    );
    cy.get("[data-pilenumber=3][data-positiononpile=2]").click();
    cy.findByRole("listitem", { name: "two diamonds" }).drag(
      "listitem",
      "three clubs"
    );
    cy.findByRole("listitem", { name: "ace clubs" }).should(
      "have.attr",
      "data-pilenumber",
      3
    );
    cy.findByRole("listitem", { name: "two diamonds" }).should(
      "have.attr",
      "data-pilenumber",
      3
    );
    cy.findByRole("listitem", { name: "three clubs" }).should(
      "have.attr",
      "data-pilenumber",
      3
    );
  };

  it("multiple card can be dragged between piles", () => {
    dragMultipleCards();
  });

  it("multiple card can be dragged between piles and undone", () => {
    dragMultipleCards();
    clickUndo();
    cy.findByRole("listitem", { name: "ace clubs" }).should(
      "have.attr",
      "data-pilenumber",
      4
    );
    cy.findByRole("listitem", { name: "two diamonds" }).should(
      "have.attr",
      "data-pilenumber",
      4
    );
  });
  it("card can be dragged to pile from foundation", () => {
    cy.findByRole("listitem", { name: "ace clubs" }).drag(
      "list",
      `foundation 0`
    );
    cy.findByRole("listitem", { name: "ace clubs" })
      .parent()
      .parent()
      .should("have.attr", "aria-label", "foundation 0");
    cy.findByText("Score: 10").should("exist");
    cy.findByRole("listitem", { name: "ace clubs" }).drag(
      "listitem",
      "two diamonds"
    );
    cy.findByText("Score: 0").should("exist");
    cy.findByRole("listitem", { name: "ace clubs" }).should(
      "have.attr",
      "data-pilenumber",
      4
    );
  });
  it("wrong card can not be dragged to foundation from pile", () => {
    cy.findByRole("listitem", { name: "two diamonds" }).should(
      "have.attr",
      "data-pilenumber",
      4
    );
    cy.findByRole("listitem", { name: "two diamonds" }).drag(
      "list",
      `foundation 0`
    );
    cy.findByRole("listitem", { name: "two diamonds" }).should(
      "have.attr",
      "data-pilenumber",
      4
    );
  });
});
