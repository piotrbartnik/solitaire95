// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

import {
  createCards,
  cardName,
} from "../../packages/solitaire95/src/configs/cardTypes";
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

const cardSuites = ["spades", "diamonds", "hearts", "clubs"];

describe("Solitaire full game test", () => {
  beforeEach(() => {
    cy.visit("/");
    window.localStorage.setItem(
      "solitaireState",
      JSON.stringify(fullGameInitialState)
    );
  });

  it("game can be finished by dragging cards", () => {
    cardSuites.forEach((suite, suiteIndex) => {
      cardName.forEach((cardname) => {
        cy.findByRole("listitem", { name: `${cardname} ${suite}` }).drag(
          "list",
          `foundation ${suiteIndex}`
        );
        cy.get("body").then(($body) => {
          if ($body.find("[data-front=false][data-pilenumber]").length) {
            cy.get("[data-front=false][data-pilenumber]")
              .last()
              .children()
              .click({ force: true });
          } else if (
            !$body.find("[data-cardname][data-pilenumber]").length &&
            $body.find("[data-front=false]").length
          ) {
            cy.get("[data-front=false]")
              .last()
              .children()
              .click({ force: true });
          }
        });
      });
    });
  });
  it("game can be finished by double click cards", () => {
    cardSuites.forEach((suite) => {
      cardName.forEach((cardname) => {
        cy.findByRole("listitem", { name: `${cardname} ${suite}` }).dblclick();
        cy.get("body").then(($body) => {
          if ($body.find("[data-front=false][data-pilenumber]").length) {
            cy.get("[data-front=false][data-pilenumber]")
              .last()
              .children()
              .click({ force: true });
          } else if (
            !$body.find("[data-cardname][data-pilenumber]").length &&
            $body.find("[data-front=false]").length
          ) {
            cy.get("[data-front=false]")
              .last()
              .children()
              .click({ force: true });
          }
        });
      });
    });
  });
});
