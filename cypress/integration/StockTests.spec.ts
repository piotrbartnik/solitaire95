// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

const stockInitialState = {
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

describe("Solitaire stock for one draw", () => {
  beforeEach(() => {
    cy.visit("/");
    window.localStorage.setItem(
      "solitaireState",
      JSON.stringify(stockInitialState)
    );
  });

  it("cards can be dragger from stock to foundation", () => {
    cy.findByRole("listitem", { name: "ace diamonds" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "card stock");
    cy.findByRole("listitem", { name: "ace diamonds" }).drag(
      "list",
      `foundation 0`
    );
    cy.findByRole("listitem", { name: "ace diamonds" })
      .parent()
      .parent()
      .should("have.attr", "aria-label", "foundation 0");
  });
  it("cards can be dragger from stock to pile", () => {
    cy.get("[data-front=false]").first().click({ force: true });
    cy.findByRole("listitem", { name: "king diamonds" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "card stock");
    cy.findByRole("listitem", { name: "king diamonds" }).drag("list", `pile 0`);
    cy.findByRole("listitem", { name: "king diamonds" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "pile 0");
  });
  it("cards can be dragger from stock to pile to card", () => {
    cy.findByRole("listitem", { name: "ace diamonds" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "card stock");
    cy.findByRole("listitem", { name: "ace diamonds" }).drag(
      "listitem",
      `two clubs`
    );
    cy.findByRole("listitem", { name: "ace diamonds" }).should(
      "have.attr",
      "data-pilenumber",
      1
    );
  });
  it("cards can not be dragger to the same color higher card", () => {
    cy.findByRole("listitem", { name: "ace diamonds" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "card stock");
    cy.findByRole("listitem", { name: "ace diamonds" }).drag(
      "listitem",
      `two hearts`
    );
    cy.findByRole("listitem", { name: "ace diamonds" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "card stock");
  });
  it("cards can not be dragger to foundation if lower card is not on it", () => {
    cy.get("[data-front=false]").first().click({ force: true });
    cy.findByRole("listitem", { name: "king diamonds" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "card stock");
    cy.findByRole("listitem", { name: "king diamonds" }).drag(
      "list",
      `foundation 0`
    );
    cy.findByRole("listitem", { name: "king diamonds" })
      .parent()
      .parent()
      .parent()
      .should("have.attr", "aria-label", "card stock");
  });
  it("next suite card can be dragged to foundation from stock", () => {
    cy.findByRole("listitem", { name: "ace diamonds" }).drag(
      "list",
      `foundation 0`
    );
    cy.get("[data-front=false]").first().click({ force: true });
    cy.get("[data-front=false]").first().click({ force: true });
    cy.findByRole("listitem", { name: "two diamonds" }).drag(
      "list",
      `foundation 0`
    );
    cy.findByRole("listitem", { name: "ace diamonds" })
      .parent()
      .parent()
      .should("have.attr", "aria-label", "foundation 0");
    cy.findByRole("listitem", { name: "two diamonds" })
      .parent()
      .parent()
      .should("have.attr", "aria-label", "foundation 0");
  });
});
