// load the global Cypress types
/// <reference types="cypress" />

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

const reactDndCypressImplementation = (
  sourceSelector: JQuery<HTMLElement>,
  targetSelector: string
): void => {
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
};

Cypress.Commands.add(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  "drag" as any,
  {
    prevSubject: "element",
  },
  reactDndCypressImplementation
);
