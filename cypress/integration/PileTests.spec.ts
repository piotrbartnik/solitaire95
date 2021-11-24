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
      1: [
        ["ace", "a", null, "black", "0"],
        ["ace", "hearts", null, "red", "0"],
      ],
      2: [
        ["ace", "b", null, "black", "0"],
        ["ace", "c", null, "red", "0"],
        ["ace", "diamonds", null, "red", "0"],
      ],
      3: [
        ["ace", "d", null, "black", "0"],
        ["ace", "e", null, "red", "0"],
        ["ace", "r", null, "red", "0"],
        ["ace", "clubs", null, "black", "0"],
      ],
      4: [
        ["ace", "g", null, "black", "0"],
        ["ace", "h", null, "red", "0"],
        ["ace", "i", null, "red", "0"],
        ["ace", "x", null, "black", "0"],
        ["two", "diamonds", null, "red", "1"],
      ],
      6: [],
    },
  },
  stockCounter: { stockRevolutions: 0 },
  timeCounter: { initialTime: 0, scoreTime: 0 },
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
      cy.findByText(`Score: ${10 * (i + 1)}`).should("exist");
    }
  });

  it("aces can be moved to higher card on pile", () => {
    cy.findByRole("listitem", { name: "ace clubs" }).drag(
      "listitem",
      "two diamonds"
    );
  });
});
