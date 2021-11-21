function DndSimulatorDataTransfer() {
  this.data = {};
}

DndSimulatorDataTransfer.prototype.dropEffect = "move";
DndSimulatorDataTransfer.prototype.effectAllowed = "all";
DndSimulatorDataTransfer.prototype.files = [];
DndSimulatorDataTransfer.prototype.items = [];
DndSimulatorDataTransfer.prototype.types = [];

DndSimulatorDataTransfer.prototype.clearData = function (format) {
  if (format) {
    delete this.data[format];

    const index = this.types.indexOf(format);
    delete this.types[index];
    delete this.data[index];
  } else {
    this.data = {};
  }
};

DndSimulatorDataTransfer.prototype.setData = function (format, data) {
  this.data[format] = data;
  this.items.push(data);
  this.types.push(format);
};

DndSimulatorDataTransfer.prototype.getData = function (format) {
  if (format in this.data) {
    return this.data[format];
  }

  return "";
};

Cypress.Commands.add(
  "drag",
  {
    prevSubject: "element",
  },
  (sourceSelector, targetSelector) => {
    const dataTransfer = new DndSimulatorDataTransfer();

    cy.wrap(sourceSelector.get(0))
      .trigger("mousedown", { which: 1 })
      .trigger("dragstart", { dataTransfer })
      .trigger("drag", {});

    cy.get(targetSelector)
      .trigger("dragover", { dataTransfer })
      .trigger("drop", { dataTransfer })
      .trigger("dragend", { dataTransfer })
      .trigger("mouseup", { which: 1 });
  }
);

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
    // cy.get("[data-front=true]")
    //   .trigger("mousedown", { which: 1 })
    //   .trigger("mousemove", { clientX: 100, clientY: 100 })
    //   .trigger("mouseup", { force: true });
    cy.get("[data-front=true]").drag("div[class*='foundation']div[id='0']");
  });
});

// cy.get(`.piece-${number}`)
//       .trigger('mousedown', { which: 1 })
//       .trigger('mousemove', { clientX: x, clientY: y })
//       .trigger('mouseup', { force: true })
