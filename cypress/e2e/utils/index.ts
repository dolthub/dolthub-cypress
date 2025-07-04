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
export const defaultTimeout = 10000;
export const opts: Partial<Cypress.Timeoutable> = {
  timeout: defaultTimeout,
};
export const clickOpts: Partial<Cypress.ClickOptions> = {
  scrollBehavior: false,
};

const username = Cypress.env("TEST_USERNAME");
const password = Cypress.env("TEST_PASSWORD");

export const deviceDimensions: Record<
  Cypress.ViewportPreset,
  Cypress.Viewport
> = {
  "macbook-15": { viewportWidth: 1440, viewportHeight: 900 },
  "macbook-16": { viewportWidth: 1536, viewportHeight: 960 },
  "macbook-13": { viewportWidth: 1280, viewportHeight: 800 },
  "macbook-11": { viewportWidth: 1366, viewportHeight: 768 },
  "ipad-2": { viewportWidth: 768, viewportHeight: 1024 },
  "ipad-mini": { viewportWidth: 768, viewportHeight: 1024 },
  "iphone-xr": { viewportWidth: 414, viewportHeight: 896 },
  "iphone-x": { viewportWidth: 375, viewportHeight: 812 },
  "iphone-6+": { viewportWidth: 414, viewportHeight: 736 },
  "iphone-se2": { viewportWidth: 375, viewportHeight: 667 },
  "iphone-8": { viewportWidth: 375, viewportHeight: 667 },
  "iphone-7": { viewportWidth: 375, viewportHeight: 667 },
  "iphone-3": { viewportWidth: 320, viewportHeight: 480 },
  "iphone-4": { viewportWidth: 320, viewportHeight: 480 },
  "iphone-5": { viewportWidth: 320, viewportHeight: 568 },
  "iphone-6": { viewportWidth: 375, viewportHeight: 667 },
  "samsung-note9": { viewportWidth: 414, viewportHeight: 846 },
  "samsung-s10": { viewportWidth: 360, viewportHeight: 760 },
};
// RUN TESTS

type TestsArgs = {
  tests: Tests;
  isMobile: boolean;
};

export function runTests({ tests }: TestsArgs) {
  tests.forEach(t => {
    cy.log(t.description);

    if (t.skip) return;

    testAssertion(t);

    if (t.clickFlow) {
      testClickFlow(t.clickFlow);
    }

    if (t.scrollTo) {
      handleScrollTo(t.scrollTo);
    }
  });
}

type TestsForDevicesArgs = {
  devices: Devices;
  currentPage: string;
  skip?: boolean;
  loggedIn?: boolean;
  forGatsby?: boolean;
};

export function runTestsForDevices({
  devices,
  currentPage,
  loggedIn = false,
  skip = false,
  forGatsby = false,
}: TestsForDevicesArgs) {
  beforeEach(() => {
    if (forGatsby) {
      cy.handleGoogle();
      cy.visitAndWait(currentPage);
    } else {
      // Visit page and log in if needed
      cy.visitPage(currentPage, loggedIn);
    }
  });

  devices.forEach(d => {
    // Skip tests that require login if username and password not found
    const skipForLogin = loggedIn && (!username || !password);
    if (skip || skipForLogin) {
      xit(d.description, deviceDimensions[d.device], () => {
        runTests(d);
      });
    } else {
      it(d.description, deviceDimensions[d.device], () => {
        runTests(d);
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
    if (typeString.withWarmup) {
      cy.get(selectorStr, opts).type("test");
      cy.get(selectorStr, opts).clear(clickOpts);
      cy.get(selectorStr, opts).wait(10).focus();
    }

    if (!typeString.skipClear) {
      cy.get(selectorStr, opts).clear(clickOpts);
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
    if (shouldArgs.chainer === "be.visible.and.contain") {
      return cy
        .get(selectorStr, opts)
        .should("be.visible")
        .should($el => {
          shouldArgs.value.forEach((v: string) =>
            expect($el).to.contain(v, message),
          );
        });
    }
    if (shouldArgs.chainer === "have.attr") {
      return cy
        .get(selectorStr, opts)
        .should(shouldArgs.chainer, ...shouldArgs.value, { message });
    }

    throw new Error(
      `Chainer ${shouldArgs.chainer} not supported with an array of values`,
    );
  }
  return cy
    .get(selectorStr, opts)
    .should(shouldArgs.chainer, shouldArgs.value, { message });
}

// testClickFlow recursively runs clickFlow tests
// clicking each toClickBefore first, then making assertions
// the clicking each toClickAfter
export function testClickFlow(clickFlow: ClickFlow) {
  const { toClickBefore, expectations, toClickAfter, force } = clickFlow;
  if (toClickBefore) runClicks(toClickBefore, force);

  expectations.forEach(t => {
    testAssertion(t);
    if (t.clickFlow) testClickFlow(t.clickFlow);
  });

  if (toClickAfter) runClicks(toClickAfter);
}

// runClicks clicks on each selectorStr
function runClicks(clickStrOrArr: string | string[], force?: boolean) {
  const cOpts = { ...clickOpts, force };
  if (Array.isArray(clickStrOrArr)) {
    clickStrOrArr.forEach(clickStr => {
      cy.get(clickStr, opts).click(cOpts);
    });
  } else {
    cy.get(clickStrOrArr, opts).click(cOpts);
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

  if ("x" in scrollTo && "y" in scrollTo) {
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
