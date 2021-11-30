import {
  ClickFlow,
  Devices,
  Expectation,
  ScrollTo,
  ShouldArgs,
  Tests,
} from "./types";

// defaultTimeout is the time in ms cypress will wait attempting
// to .get() an element before failing
export const defaultTimeout = 10000;
export const opts: Partial<Cypress.Timeoutable> = {
  timeout: defaultTimeout,
};
export const clickOpts: Partial<Cypress.ClickOptions> = {
  scrollBehavior: false,
  force: false,
};

const username = Cypress.env("TEST_USERNAME");
const password = Cypress.env("TEST_PASSWORD");

// RUN TESTS

type TestsArgs = {
  loggedIn?: boolean;
  device: Cypress.ViewportPreset;
  currentPage: string;
  tests: Tests;
};

export function runTests({
  device,
  currentPage,
  tests,
  loggedIn = false,
}: TestsArgs) {
  before(() => {
    cy.visitPage(currentPage, loggedIn);
  });

  beforeEach(() => {
    // Preserve dolthubToken cookie through all tests for page
    Cypress.Cookies.preserveOnce("dolthubToken");

    cy.visitViewport(device);
  });

  after(() => {
    if (loggedIn) cy.signout();
  });

  tests.forEach(t => {
    if (t.skip) {
      xit(t.description, () => {});
    } else {
      it(t.description, () => {
        if (t.redirect) {
          // Sign in and continue to redirect value before starting test assertions
          cy.loginAsCypressTestingFromSigninPageWithRedirect(t.redirect);
        }

        testAssertion(t);

        if (t.clickFlows) {
          testClickFlows({
            clickFlows: t.clickFlows,
            description: t.description,
            forceClick: t.forceClick,
          });
        }

        if (t.scrollTo) {
          handleScrollTo(t.scrollTo);
        }

        if (t.redirect) {
          // Sign out after signing in for redirect and running tests
          cy.signout();
        }
      });
    }
  });
}

type TestsForDevicesArgs = {
  currentPage: string;
  devices: Devices;
  skip?: boolean;
};

export function runTestsForDevices({
  devices,
  currentPage,
  skip = false,
}: TestsForDevicesArgs) {
  devices.forEach(d => {
    // Skip tests that require login if username and password not found
    const skipForLogin = d.loggedIn && (!username || !password);

    if (skip || skipForLogin) {
      describe.skip(d.description, () => {
        runTests({ ...d, currentPage });
      });
    } else {
      describe(d.description, () => {
        runTests({ ...d, currentPage });
      });
    }
  });
}

// HELPER FUNCTIONS

function testAssertion(t: Expectation) {
  if (Array.isArray(t.selector)) {
    return t.selector.forEach(s =>
      getAssertionTest(
        t.description,
        s,
        t.shouldArgs,
        t.typeString,
        t.url,
        t.scrollIntoView,
      ),
    );
  }
  return getAssertionTest(
    t.description,
    t.selector,
    t.shouldArgs,
    t.typeString,
    t.url,
    t.scrollIntoView,
  );
}

function getAssertionTest(
  description: string,
  selectorStr: string,
  shouldArgs: ShouldArgs,
  typeString?: string,
  url?: string,
  scrollIntoView?: boolean,
) {
  const message = `
  Test assertion failed... 
  related test: ${description},
  related selector: ${selectorStr},
`;
  if (typeString) {
    return cy
      .get(selectorStr, opts)
      .clear(clickOpts)
      .type(typeString, clickOpts);
  }
  if (url) {
    const base = Cypress.config().baseUrl;
    cy.location("href", opts).should("eq", `${base}${url}`);
  }
  if (scrollIntoView) {
    scrollSelectorIntoView(selectorStr);
  }
  if (Array.isArray(shouldArgs.value)) {
    return cy
      .get(selectorStr, opts)
      .should(shouldArgs.chainer, ...shouldArgs.value, { message });
  }
  return cy
    .get(selectorStr, opts)
    .should(shouldArgs.chainer, shouldArgs.value, { message });
}

type ClickFlowsArgs = {
  description: string;
  clickFlows?: ClickFlow[];
  forceClick?: boolean;
};

// testClickFlows recursively runs clickFlow tests
// clicking each toClickBefore first, then making assertions
// the clicking each toClickAfter
export function testClickFlows({
  description,
  clickFlows,
  forceClick,
}: ClickFlowsArgs) {
  if (!clickFlows) return;

  clickFlows.forEach(({ toClickBefore, expectations, toClickAfter }) => {
    if (toClickBefore) runClicks(toClickBefore, forceClick);

    expectations.forEach(t => {
      testAssertion(t);
      testClickFlows({
        description,
        clickFlows: t.clickFlows,
        forceClick: t.forceClick,
      });
    });

    if (toClickAfter) runClicks(toClickAfter, forceClick);
  });
}

// runClicks clicks on each selectorStr
function runClicks(clickStrOrArr: string | string[], forceClick?: boolean) {
  if (Array.isArray(clickStrOrArr)) {
    clickStrOrArr.forEach(clickStr => {
      cy.get(clickStr, opts).click({ ...clickOpts, force: forceClick });
    });
  } else {
    cy.get(clickStrOrArr, opts).click({ ...clickOpts, force: forceClick });
  }
}

// scrollSelectorIntoView scrolls the selector into view
function scrollSelectorIntoView(clickStrOrArr: string | string[]) {
  if (Array.isArray(clickStrOrArr)) {
    clickStrOrArr.forEach(clickStr => {
      cy.get(clickStr, opts).scrollIntoView();
    });
  } else {
    cy.get(clickStrOrArr, opts).scrollIntoView();
  }
}

// handleScrollTo scrolls to the given selector string and the designated position
function handleScrollTo(scrollTo: ScrollTo) {
  if ("position" in scrollTo) {
    if (scrollTo.selectorStr) {
      return cy
        .get(scrollTo.selectorStr)
        .scrollTo(scrollTo.position, scrollTo.options);
    }
    return cy.scrollTo(scrollTo.position, scrollTo.options);
  }

  if ("x" in scrollTo || "y" in scrollTo) {
    if (scrollTo.selectorStr) {
      return cy
        .get(scrollTo.selectorStr)
        .scrollTo(scrollTo.x, scrollTo.y, scrollTo.options);
    }
    return cy.scrollTo(scrollTo.x, scrollTo.y, scrollTo.options);
  }

  if ("selectorStr" in scrollTo) {
    return cy.get(scrollTo.selectorStr).scrollIntoView(scrollTo.options);
  }
  throw new Error(`invalid scrollTo type: ${scrollTo}`);
}
