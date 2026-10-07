import { iPad2, iPhoneX, macbook15 } from "../devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newExpectationWithScrollIntoView,
  newExpectationWithTrigger,
  newShouldArgs,
} from "../helpers";
import { runTestsForDevices } from "../index";
import { Tests } from "../types";
import {
  testMobileNavbar,
  testSignedInNavbar,
  testSignedOutNavbar,
} from "./navbar";
import { beVisible, notExist } from "./sharedFunctionsAndVariables";

// Keep scrolled links below the fixed mobile menu header.
const scrollOptions = { offset: { top: -100, left: 0 } };
const visibleMenuItem = (selector: string) =>
  newExpectationWithScrollIntoView(
    `should show ${selector}`,
    selector,
    beVisible,
    scrollOptions,
  );
const expanded = (value: boolean) =>
  newShouldArgs("have.attr", ["aria-expanded", String(value)]);

function menuTests(trigger: string, contents: Tests, isMobile: boolean): Tests {
  const open = isMobile
    ? newExpectationWithClickFlow(
        "should expand menu on click",
        trigger,
        beVisible,
        newClickFlow(trigger, [
          newExpectation("should be expanded", trigger, expanded(true)),
        ]),
      )
    : newExpectationWithTrigger(
        "should expand menu on hover",
        trigger,
        expanded(true),
        "mouseover",
      );
  return [
    visibleMenuItem(trigger),
    newExpectation("should start collapsed", trigger, expanded(false)),
    open,
    ...contents,
    visibleMenuItem(trigger),
    newExpectationWithClickFlow(
      "should collapse menu on click",
      trigger,
      expanded(true),
      newClickFlow(trigger, [
        newExpectation("should be collapsed", trigger, expanded(false)),
      ]),
    ),
  ];
}

function navbarMenuTests(isMobile: boolean, loggedIn: boolean): Tests {
  const productsTrigger = isMobile
    ? "[data-cy=mobile-navbar-products]"
    : "[data-cy=navbar-products]";
  const docsTrigger = isMobile
    ? "[data-cy=mobile-navbar-docs]"
    : "[data-cy=navbar-docs-menu]";
  // Both layouts render the same ProductCard/HostedCard data-cy values.
  // Scope mobile assertions to the accordion so desktop cards cannot satisfy them.
  const productSelector = (product: string) =>
    `${isMobile ? "[data-cy=mobile-navbar-links] " : ""}[data-cy=nav-product-${product}]`;
  const docSelector = (doc: string) =>
    `[data-cy=${isMobile ? "mobile-" : ""}nav-docs-${doc}]`;
  return [
    ...menuTests(
      productsTrigger,
      [
        ...[
          "dolt",
          "doltgresql",
          "doltlite",
          "dolthub",
          "doltlab",
          "dolt-workbench",
          "hosted-dolt",
        ].map(product => visibleMenuItem(productSelector(product))),
        newExpectation(
          "should link DoltHub to the appropriate signed-in or signed-out page",
          `${productSelector("dolthub")}[href$="/${loggedIn ? "profile" : "signin"}"]`,
          newShouldArgs("exist"),
        ),
        newExpectation(
          "should link to creating a Hosted Dolt deployment",
          `${productSelector("hosted-dolt")} a[href="https://hosted.doltdb.com/create-deployment"]`,
          newShouldArgs("exist"),
        ),
      ],
      isMobile,
    ),
    newExpectation(
      "should remove product cards",
      productSelector("dolt"),
      notExist,
    ),
    ...menuTests(
      docsTrigger,
      ["dolt", "doltgresql", "doltlab"].map(doc =>
        visibleMenuItem(`${docSelector(doc)}[href]`),
      ),
      isMobile,
    ),
    newExpectation(
      "should remove documentation links",
      docSelector("dolt"),
      notExist,
    ),
  ];
}

export function testNavbarMenus(currentPage: string, loggedIn = false) {
  if (loggedIn) {
    beforeEach(function skipWithoutCredentials() {
      cy.env(["TEST_USERNAME", "TEST_PASSWORD"]).then(credentials => {
        if (!credentials.TEST_USERNAME || !credentials.TEST_PASSWORD)
          this.skip();
      });
    });
  }
  const desktopTests = [
    ...(loggedIn ? testSignedInNavbar : testSignedOutNavbar),
    ...navbarMenuTests(false, loggedIn),
  ];
  const mobileTests = [
    ...testMobileNavbar(loggedIn),
    newExpectationWithClickFlow(
      "should open mobile navigation and exercise its menus",
      "[data-cy=mobile-navbar-menu-button]",
      beVisible,
      newClickFlow(
        "[data-cy=mobile-navbar-menu-button]",
        navbarMenuTests(true, loggedIn),
        "[data-cy=mobile-navbar-close-button]",
      ),
    ),
    newExpectation(
      "should remove mobile navigation",
      "[data-cy=mobile-navbar-links]",
      notExist,
    ),
  ];
  runTestsForDevices({
    currentPage,
    loggedIn,
    devices: [
      macbook15("Navbar menus", desktopTests),
      iPad2("Navbar menus", mobileTests),
      iPhoneX("Navbar menus", mobileTests),
    ],
  });
}
