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
export const defaultTimeout = 5000;

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
      // TODO: set up login and login here if necessary
    }

    // 404 page should be rendered when page not found
    cy.visit(currentPage, { failOnStatusCode: false });
  });

  beforeEach(() => {
    cy.viewport(device);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);
  });

  // run extras
  // extras.forEach(extra => {
  //   if (extra && typeof extra === "function") extra();
  // });

  tests.forEach(t => {
    if (t.skip) {
      xit(t.description, () => {});
    } else {
      it(t.description, () => {
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
      });
    }
  });

  after(() => {
    cy.window().then(win => {
      // eslint-disable-next-line no-param-reassign
      win.onbeforeunload = null;
    });
  });
}

type TestsForDevicesArgs = {
  currentPage: string;
  devices: Devices;
};

export function runTestsForDevices({
  devices,
  currentPage,
}: TestsForDevicesArgs) {
  devices.forEach(d => {
    describe(d.description, () => {
      runTests({ ...d, currentPage });
    });
  });
}

// HELPER FUNCTIONS

function testAssertion(t: Expectation) {
  if (Array.isArray(t.selector)) {
    return t.selector.forEach(s =>
      getAssertionTest(t.description, s, t.shouldArgs),
    );
  }
  return getAssertionTest(t.description, t.selector, t.shouldArgs);
}

function getAssertionTest(
  description: string,
  selectorStr: string,
  shouldArgs: ShouldArgs,
) {
  const message = `
  Test assertion failed... 
  related test: ${description},
  related selector: ${selectorStr},
`;
  if (Array.isArray(shouldArgs.value)) {
    return cy
      .get(selectorStr, { timeout: defaultTimeout })
      .should(shouldArgs.chainer, ...shouldArgs.value, { message });
  }
  return cy
    .get(selectorStr, { timeout: defaultTimeout })
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
      testClickFlows({ description, clickFlows: t.clickFlows });
    });

    if (toClickAfter) runClicks(toClickAfter);
  });
}

// runClicks clicks on each selectorStr
function runClicks(clickStrOrArr: string | string[]) {
  if (Array.isArray(clickStrOrArr)) {
    clickStrOrArr.forEach(clickStr => {
      cy.get(clickStr, { timeout: defaultTimeout }).click();
    });
  } else {
    cy.get(clickStrOrArr, { timeout: defaultTimeout }).click();
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
