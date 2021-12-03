// in cypress/support/types.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;

    loginAsCypressTestingAfterNavigateToSignin(redirectValue?: string): void;

    signout(isMobile: boolean): void;

    loginAsCypressTestingFromSigninPageWithRedirect(
      redirectValue: string,
    ): void;

    visitPage(currentPage: string, loggedIn: boolean): void;

    visitViewport(device: Cypress.ViewportPreset): void;

    visitAndWait(path: string): void;
  }
}
