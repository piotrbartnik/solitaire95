// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

import { fullGameInitialState, resolveSolitaire } from "../support/testHelpers";

describe("Solitaire full game test", () => {
  beforeEach(() => {
    cy.visit("/");
    window.localStorage.setItem(
      "solitaireState",
      JSON.stringify(fullGameInitialState)
    );
  });

  it("game can be finished by dragging cards", () => {
    cy.findByText("Score: 0").should("exist");
    resolveSolitaire("drag");
    cy.findByText(/Score: 6\d+/).should("exist");
  });
  it("game can be finished by double click cards", () => {
    cy.findByText("Score: 0").should("exist");
    resolveSolitaire("dbclick");
    cy.findByText(/Score: 6\d+/).should("exist");
  });
  it("game can be finished by dragging cards in more than 30s and additionall score is added", () => {
    cy.findByText("Score: 0").should("exist");
    resolveSolitaire("drag", true);
    cy.findByText(/Score: \d{4}\d?/).should("exist");
  });
  it("game can be finished by clicking cards in more than 30s and additionall score is added", () => {
    cy.findByText("Score: 0").should("exist");
    resolveSolitaire("drag", true);
    cy.findByText(/Score: \d{4}\d?/).should("exist");
  });
});
