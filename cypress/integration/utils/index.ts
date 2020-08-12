// defaultTimeout is the time in ms cypress will wait attempting
// to .get() an element before failing
export const defaultTimeout = 5000;

// TYPES

type ShouldArgs = { chainer: string; value?: any };

type Selector = string | string[];

type ScrollToPosition = {
  position: Cypress.PositionType;
  selectorStr?: string;
  options?: Partial<Cypress.ScrollToOptions>;
};

type ScrollToXY = {
  x: string | number;
  y: string | number;
  selectorStr?: string;
  options?: Partial<Cypress.ScrollToOptions>;
};

type ScrollIntoView = {
  selectorStr: string;
  options?: Partial<Cypress.ScrollIntoViewOptions>;
};

type ScrollTo = ScrollToPosition | ScrollToXY | ScrollIntoView;

type Expectation = {
  description: string;
  selector: Selector;
  shouldArgs: ShouldArgs;
  clickFlows?: Array<ClickFlow> | undefined;
  scrollTo?: ScrollTo;
  skip?: boolean;
};

type Click = string | string[] | undefined;

type ClickFlow = {
  toClickBefore?: Click;
  expectations: Array<Expectation>;
  toClickAfter?: Click;
};

export type Tests = Array<Expectation>;

type Device = {
  device: Cypress.ViewportPreset;
  description: string;
  loggedIn: boolean;
  tests: Tests;
};

export type Devices = Array<Device>;

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
    cy.wait(200);
  });

  // run extras
  // extras.forEach(extra => {
  //   if (extra && typeof extra === "function") extra();
  // });

  tests.forEach(t => {
    if (t.skip) {
      xit(t.description, function () {});
    } else {
      it(t.description, function () {
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
    describe(d.description, function () {
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
  clickFlows: Array<ClickFlow>;
};

// testClickFlows recursively runs clickFlow tests
// clicking each toClickBefore first, then making assertions
// the clicking each toClickAfter
export function testClickFlows({ description, clickFlows }: ClickFlowsArgs) {
  clickFlows.forEach(({ toClickBefore, expectations, toClickAfter }) => {
    if (toClickBefore) runClicks(toClickBefore);

    expectations.forEach(t => {
      testAssertion(t);
      if (!t.clickFlows) return;
      testClickFlows({ description, clickFlows });
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

// CREATES NEW OBJECTS

export function newExpectation(
  description: string,
  selector: Selector,
  shouldArgs: ShouldArgs,
  skip = false,
): Expectation {
  return { description, selector, shouldArgs, skip };
}

export function newExpectationWithClickFlows(
  description: string,
  selector: string,
  shouldArgs: ShouldArgs,
  clickFlows: Array<ClickFlow>,
  skip = false,
): Expectation {
  return { description, selector, shouldArgs, clickFlows, skip };
}

export function newClickFlow(
  toClickBefore: Click,
  expectations: Tests,
  toClickAfter?: Click,
): ClickFlow {
  return {
    toClickBefore,
    expectations,
    toClickAfter,
  };
}

export function newDevice(
  device: Cypress.ViewportPreset,
  description: string,
  loggedIn: boolean,
  tests: Tests,
): Device {
  return { device, description, loggedIn, tests };
}

export function newShouldArgs(chainer: string, value?: any) {
  return { chainer, value };
}
