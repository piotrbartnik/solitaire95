/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to test drag and drop from ReactDND
     * @example cy.drag(targetSelector: string)
     */
    drag: (targetSelector: string) => void;
  }
}
