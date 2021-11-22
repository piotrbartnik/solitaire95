// load the global Cypress types
/// <reference types="cypress" />

class DndSimulatorDataTransfer {
  data: Record<string, unknown>;
  dropEffect: string;
  effectAllowed: string;
  files: [];
  items: [];
  types: [];

  constructor() {
    this.data = {};
    this.dropEffect = "move";
    this.effectAllowed = "all";
    this.files = [];
    this.items = [];
    this.types = [];
  }

  clearData(format: never) {
    if (format) {
      delete this.data[format];

      const index = this.types.indexOf(format);
      delete this.types[index];
      delete this.data[index];
    } else {
      this.data = {};
    }
  }

  setData(format: never, data: never) {
    this.data[format] = data;
    this.items.push(data);
    this.types.push(format);
  }

  getData(format) {
    if (format in this.data) {
      return this.data[format];
    }

    return "";
  }
}

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
