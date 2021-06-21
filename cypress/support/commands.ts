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

export const defaultTimeout = 10000;

const username = Cypress.env("TEST_USERNAME");
const password = Cypress.env("TEST_PASSWORD");

Cypress.Commands.add("dataCy", (value: string) => cy.get(`[data-cy=${value}]`));

// Ensures page has loaded before running tests
// Reference: https://www.cypress.io/blog/2018/02/05/when-can-the-test-start/
Cypress.Commands.add("visitAndWait", (path: string) => {
  let appHasStarted = false;

  function spyOnAddEventListener(win: any) {
    // win = window object in our application
    const addListener = win.EventTarget.prototype.addEventListener;
    // eslint-disable-next-line no-param-reassign
    win.EventTarget.prototype.addEventListener = function (name: string) {
      if (name === "change") {
        // web app added an event listener to the input box -
        // that means the web application has started
        appHasStarted = true;
        // restore the original event listener
        // eslint-disable-next-line no-param-reassign
        win.EventTarget.prototype.addEventListener = addListener;
      }
      // eslint-disable-next-line prefer-rest-params
      return addListener.apply(this, arguments);
    };
  }

  function waitForAppStart() {
    // keeps rechecking "appHasStarted" variable
    return new Cypress.Promise((resolve, _) => {
      // eslint-disable-next-line consistent-return
      const isReady = () => {
        if (appHasStarted) {
          return resolve();
        }
        setTimeout(isReady, 0);
      };
      isReady();
    });
  }

  cy.visit(path, {
    onBeforeLoad: spyOnAddEventListener,
    failOnStatusCode: false,
  }).then(waitForAppStart);
});

Cypress.Commands.add(
  "loginAsCypressTestingAfterNavigateToSignin",
  (redirectValue?: string) => {
    if (!password || !username) {
      throw new Error("Username or password env not set");
    }

    cy.visitAndWait("/signin");
    cy.visitViewport("macbook-15");
    completeLoginForCypressTesting();
    ensureSuccessfulLogin(redirectValue);
  },
);

Cypress.Commands.add(
  "loginAsCypressTestingFromSigninPageWithRedirect",
  (redirectValue: string) => {
    cy.location("pathname", { timeout: defaultTimeout }).should(
      "eq",
      `/signin`,
    );
    cy.location("search", { timeout: defaultTimeout })
      .should("eq", `?redirect=%2F${redirectValue}`)
      .then(() => {
        completeLoginForCypressTesting();
        ensureSuccessfulLogin(redirectValue);
      });
  },
);

function ensureSuccessfulLogin(redirectValue?: string) {
  if (redirectValue) {
    cy.location("pathname", { timeout: defaultTimeout }).should(
      "include",
      `/${redirectValue}`,
    );
  } else {
    cy.location("pathname", { timeout: defaultTimeout }).should(
      "include",
      "/profile",
    );
  }
  cy.get("[data-cy=navbar-menu-avatar]", { timeout: defaultTimeout }).should(
    "be.visible",
  );
}

function completeLoginForCypressTesting() {
  // Check that email form has rendered
  cy.get("[data-cy=signin-email-form]", { timeout: defaultTimeout }).should(
    "be.visible",
  );

  // Enter username and password in inputs
  cy.get("input[name=username]", { timeout: defaultTimeout })
    .should("be.visible")
    .type(username, {
      log: false,
      scrollBehavior: false,
    });
  cy.get("input[name=username]").should("have.value", username);
  cy.get("input[name=password]", { timeout: defaultTimeout })
    .should("be.visible")
    .type(password, { log: false, scrollBehavior: false })
    .type("{enter}", { scrollBehavior: false });
}

Cypress.Commands.add("signout", () => {
  cy.get("[data-cy=navbar-menu-avatar]", { timeout: defaultTimeout }).click({
    scrollBehavior: false,
  });
  cy.get("[data-cy=sign-out-button]", { timeout: defaultTimeout }).click({
    scrollBehavior: false,
  });
  cy.clearCookie("dolthubToken");
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
    // If page tests require a user to be logged in, go to signin page and log in test user
    cy.loginAsCypressTestingAfterNavigateToSignin();
  }

  // 404 page should be rendered when page not found
  cy.visitAndWait(currentPage);
});

Cypress.Commands.add("visitViewport", (device: Cypress.ViewportPreset) => {
  cy.viewport(device);
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500);
});
