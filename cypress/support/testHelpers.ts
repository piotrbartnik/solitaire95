import {
  createCards,
  cardName,
} from "../../packages/solitaire95/src/configs/cardTypes";
import { orderPiles } from "../../packages/solitaire95/src/store/actions/cardActions";

export const clickUndo = (): void => {
  cy.findByRole("button", { name: "Game" }).click();
  cy.findByRole("button", { name: "Undo" }).click();
};

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

export const fullGameInitialState = {
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

export const resolveSolitaire = (actionType: "drag" | "dbclick"): void => {
  cy.findByRole("listitem", { name: "ace spades" }).should(
    "have.attr",
    "data-pilenumber",
    6
  );
  cy.findByRole("listitem", { name: "ace diamonds" }).should(
    "have.attr",
    "data-pilenumber",
    4
  );
  cy.findByRole("listitem", { name: "king diamonds" }).should(
    "have.attr",
    "data-pilenumber",
    1
  );
  cardSuites.forEach((suite, suiteIndex) => {
    cardName.forEach((cardname) => {
      if (actionType === "drag") {
        cy.findByRole("listitem", { name: `${cardname} ${suite}` }).drag(
          "list",
          `foundation ${suiteIndex}`
        );
      } else {
        cy.findByRole("listitem", { name: `${cardname} ${suite}` }).dblclick();
      }
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
          cy.get("[data-front=false]").last().children().click({ force: true });
        }
      });
    });
  });
  cardSuites.forEach((suite, suiteIndex) => {
    cardName.forEach((cardname) => {
      cy.findByRole("listitem", { name: `${cardname} ${suite}` })
        .parent()
        .parent()
        .should("have.attr", "aria-label", `foundation ${suiteIndex}`);
    });
  });
};
