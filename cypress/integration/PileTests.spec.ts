// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

const pileTestsInitialState = {
  cardDistribution: {
    cardsOnStock: [],
    cardsFromStock: [],
    threeCardsOnTable: [],
    cardsOnPiles: {
      0: [["ace", "spades", null, "black", "0"]],
      1: [
        ["ace", "spades", null, "black", "0"],
        ["ace", "hearts", null, "red", "0"],
      ],
      2: [
        ["ace", "spades", null, "black", "0"],
        ["ace", "hearts", null, "red", "0"],
        ["ace", "diamonds", null, "red", "0"],
      ],
      3: [
        ["ace", "spades", null, "black", "0"],
        ["ace", "hearts", null, "red", "0"],
        ["ace", "diamonds", null, "red", "0"],
        ["ace", "clubs", null, "black", "0"],
      ],
      4: [],
      6: [],
    },
  },
  stockCounter: { stockRevolutions: 0 },
  timeCounter: { initialTime: 0, scoreTime: 0 },
};

describe("Solitaire piles", () => {
  it("aces can be moved to foundations", () => {
    window.localStorage.setItem(
      "solitaireState",
      JSON.stringify(pileTestsInitialState)
    );
    cy.visit("/");
    cy.findByRole("listitem", { name: "ace spades" }).drag(
      "list",
      "foundation 0"
    );
  });
});
