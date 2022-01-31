import {
  ClickFlow,
  Devices,
  Expectation,
  ScrollTo,
  ShouldArgs,
  Tests,
  TypeStringType,
} from "./types";

// defaultTimeout is the time in ms cypress will wait attempting
// to .get() an element before failing
export const defaultTimeout = 5000;
export const opts: Partial<Cypress.Timeoutable> = {
  timeout: defaultTimeout,
};
export const clickOpts: Partial<Cypress.ClickOptions> = {
  scrollBehavior: false,
};

const username = Cypress.env("TEST_USERNAME");
const password = Cypress.env("TEST_PASSWORD");

export const deviceDimentions = {
  "macbook-15": { width: 1440, height: 900 },
  "macbook-16": { width: 1536, height: 960 },
  "macbook-13": { width: 1280, height: 800 },
  "macbook-11": { width: 1366, height: 768 },
  "ipad-2": { width: 768, height: 1024 },
  "ipad-mini": { width: 768, height: 1024 },
  "iphone-xr": { width: 414, height: 896 },
  "iphone-x": { width: 375, height: 812 },
  "iphone-6+": { width: 414, height: 736 },
  "iphone-se2": { width: 375, height: 667 },
  "iphone-8": { width: 375, height: 667 },
  "iphone-7": { width: 375, height: 667 },
  "iphone-3": { width: 320, height: 480 },
  "iphone-4": { width: 320, height: 480 },
  "iphone-5": { width: 320, height: 568 },
  "iphone-6": { width: 375, height: 667 },
  "samsung-note9": { width: 414, height: 846 },
  "samsung-s10": { width: 360, height: 760 },
};
// RUN TESTS

type TestsArgs = {
  loggedIn?: boolean;
  device: Cypress.ViewportPreset;
  currentPage: string;
  tests: Tests;
  isMobile: boolean;
};

export function runTests({
  isMobile,
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
  });

  after(() => {
    if (loggedIn) cy.signout(isMobile);
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
          });
        }

        if (t.scrollTo) {
          handleScrollTo(t.scrollTo);
        }

        if (t.redirect) {
          // Sign out after signing in for redirect and running tests
          cy.signout(isMobile);
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
      describe.skip(
        d.description,
        {
          viewportHeight: deviceDimentions[d.device].height,
          viewportWidth: deviceDimentions[d.device].width,
        },
        () => {
          runTests({ ...d, currentPage });
        },
      );
    } else {
      describe(
        d.description,
        {
          viewportHeight: deviceDimentions[d.device].height,
          viewportWidth: deviceDimentions[d.device].width,
        },
        () => {
          runTests({ ...d, currentPage });
        },
      );
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
        t.selectOption,
        t.targetPage,
        t.fileUpload,
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
    t.selectOption,
    t.targetPage,
    t.fileUpload,
    t.url,
    t.scrollIntoView,
  );
}

function getAssertionTest(
  description: string,
  selectorStr: string,
  shouldArgs: ShouldArgs,
  typeString?: TypeStringType,
  selectOption?: number,
  targetPage?: string,
  fileUpload?: string,
  url?: string,
  scrollIntoView?: boolean,
) {
  const message = `
  Test assertion failed... 
  related test: ${description},
  related selector: ${selectorStr},
`;
  if (typeString) {
    if (typeString.eq) {
      return cy
        .get(selectorStr, opts)
        .eq(typeString.eq)
        .type(typeString.value, clickOpts);
    }
    if (!typeString.skipClear) {
      return cy
        .get(selectorStr, opts)
        .clear(clickOpts)
        .type(typeString.value, clickOpts);
    }
    return cy.get(selectorStr, opts).type(typeString.value, clickOpts);
  }

  if (selectOption !== undefined) {
    cy.get(selectorStr).eq(selectOption).click();
  }
  if (targetPage) {
    cy.visitPage(targetPage, false);
  }
  if (fileUpload) {
    cy.get(selectorStr).attachFile(fileUpload, { subjectType: "drag-n-drop" });
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
};

// testClickFlows recursively runs clickFlow tests
// clicking each toClickBefore first, then making assertions
// the clicking each toClickAfter
export function testClickFlows({ description, clickFlows }: ClickFlowsArgs) {
  if (!clickFlows) return;

  clickFlows.forEach(({ toClickBefore, expectations, toClickAfter }) => {
    if (toClickBefore) runClicks(toClickBefore);

    expectations.forEach(t => {
      testAssertion(t);
      testClickFlows({
        description,
        clickFlows: t.clickFlows,
      });
    });

    if (toClickAfter) runClicks(toClickAfter);
  });
}

// runClicks clicks on each selectorStr
function runClicks(clickStrOrArr: string | string[]) {
  if (Array.isArray(clickStrOrArr)) {
    clickStrOrArr.forEach(clickStr => {
      cy.get(clickStr, opts).click(clickOpts);
    });
  } else {
    cy.get(clickStrOrArr, opts).scrollIntoView().click(clickOpts);
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
