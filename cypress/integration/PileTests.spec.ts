// by loading custom commands from the support file,
// we also load the global Cypress type definition
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

describe("Solitaire", () => {
  beforeEach(function () {
    cy.clock();
    cy.viewport(1030, 900);
  });
  it("opens in web app", () => {
    window.localStorage.setItem(
      "solitaireState",
      JSON.stringify({
        cardDistribution: {
          cardsOnStock: [],
          cardsFromStock: [],
          threeCardsOnTable: [],
          cardsOnPiles: {
            0: [["ace", "spades", null, "black", "0"]],
          },
        },
        stockCounter: { stockRevolutions: 0 },
        timeCounter: { initialTime: 0, scoreTime: 0 },
      })
    );
    cy.visit("http://localhost:3007");
    cy.get("[data-front=true]").drag("div[class*='foundation']div[id='0']");
  });
});
