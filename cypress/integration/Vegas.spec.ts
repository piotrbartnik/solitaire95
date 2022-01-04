// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

import { fullGameInitialState, resolveSolitaire } from "../support/testHelpers";

describe("Solitaire Vegas test", () => {
  beforeEach(() => {
    cy.visit("/");
    window.localStorage.setItem(
      "solitaireState",
      JSON.stringify({
        ...fullGameInitialState,
        gameState: {
          scoreType: "vegas",
          bottomBarVisible: "true",
          cardDeck: "castle",
          drawType: "drawOne",
        },
      })
    );
  });

  it("game can be finished by dragging cards", () => {
    cy.findByText("Score:").should("exist");
    cy.findByText("-$52").should("exist");
    resolveSolitaire("drag");
    cy.findByText("Score:").should("exist");
    cy.findByText("$208").should("exist");
  });
  it("game can be finished by double click cards", () => {
    cy.findByText("Score:").should("exist");
    cy.findByText("-$52").should("exist");
    resolveSolitaire("dbclick");
    cy.findByText("Score:").should("exist");
    cy.findByText("$208").should("exist");
  });
});
