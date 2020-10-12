// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("dataCy", (value: string) => {
  return cy.get(`[data-cy=${value}]`);
});

const username = Cypress.env("TEST_USERNAME");
const password = Cypress.env("TEST_PASSWORD");

Cypress.Commands.add("loginAsCypressTesting", () => {
  if (!password || !username) {
    throw new Error("Username or password env not set");
  }

  cy.log("sending request to sign in test user");

  cy.request({
    url: `/api/v1alpha1/login`,
    body: { username, password },
    log: false,
  }).then(res => {
    expect(res.body.username).to.eq(username);
    cy.setCookie("dolthubToken", res.body.cookie_value);
  });

  cy.getCookie("dolthubToken").should("exist");
});

Cypress.Commands.add("visitPage", (currentPage: string, loggedIn: boolean) => {
  // create the stub here
  const ga = cy.stub().as("ga");

  // prevent google analytics from loading and replace it with a stub before every
  // single page load including all new page navigations
  cy.on("window:before:load", win => {
    Object.defineProperty(win, "ga", {
      configurable: false,
      get: () => ga, // always return the stub
      set: () => {}, // don't allow actual google analytics to overwrite this property
    });
  });

  if (loggedIn) {
    cy.loginAsCypressTesting();
  }

  // 404 page should be rendered when page not found
  cy.visit(currentPage, { failOnStatusCode: false });
});

Cypress.Commands.add("visitViewport", (device: Cypress.ViewportPreset) => {
  cy.viewport(device);
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(200);
});
