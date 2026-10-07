import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";
import {
  beVisible,
  beVisibleAndContain,
  shouldBeVisible,
} from "./sharedFunctionsAndVariables";

const sharedLinks = [
  "[data-cy=navbar-products]",
  "[data-cy=navbar-docs-menu]",
  "[data-cy=navbar-blog]",
  "[data-cy=navbar-logo]",
  "[data-cy=discord-link]",
  "[data-cy=github-link]",
  "[data-cy=navbar-pricing]",
];

export const signedOutNavbarLinks = [
  ...sharedLinks,
  "[data-cy=navbar-signin-button]",
];

const signedInNavbarLinks = sharedLinks;

const signedOutDoltLabNavbarLinks = [
  "[data-cy=navbar-logo]",
  "[data-cy=navbar-databases]",
  "[data-cy=navbar-documentation]",
  "[data-cy=navbar-signin-button]",
];

export const testSignedOutNavbar: Tests = [
  newExpectation(
    "should have signed out navbar and correct links",
    signedOutNavbarLinks,
    beVisible,
  ),
];

export const testSignedInNavbar: Tests = [
  newExpectation(
    "should have signed in navbar and correct links",
    signedInNavbarLinks,
    beVisible,
  ),
  shouldBeVisible("navbar-menu-avatar"),
];

export const testSignedOutDoltLabNavbar: Tests = [
  newExpectation(
    "should have signed out navbar and correct links",
    signedOutDoltLabNavbarLinks,
    beVisible,
  ),
];

const mobileNavbarClickFlow = (loggedIn = false) =>
  newClickFlow(
    "[data-cy=mobile-navbar-menu-button]",
    [
      newExpectation(
        "should show product and documentation accordions and navigation links",
        [
          "[data-cy=mobile-navbar-products]",
          "[data-cy=mobile-navbar-docs]",
          "[data-cy=mobile-navbar-links] [data-cy=navbar-pricing]",
          "[data-cy=mobile-navbar-links] [data-cy=navbar-blog]",
        ],
        beVisible,
      ),
      ...(loggedIn
        ? [
            newExpectation(
              "should show DoltHub sign out action",
              "[data-cy=sign-out-button-mobile]",
              beVisibleAndContain("Sign out"),
            ),
            newExpectation(
              "should show account links",
              '[aria-label="mobile-navbar-account-links"] a',
              newShouldArgs("be.visible.and.have.length", 5),
            ),
          ]
        : [
            newExpectation(
              "should show sign in action",
              "[data-cy=mobile-navbar-signin]",
              beVisibleAndContain("Sign in"),
            ),
          ]),
      newExpectation(
        "should show social links",
        "[data-cy=mobile-navbar-social-links] > a",
        newShouldArgs("be.visible.and.have.length", 5),
      ),
    ],
    "[data-cy=mobile-navbar-close-button]",
  );

export const testMobileNavbar = (loggedIn = false): Tests => [
  shouldBeVisible("mobile-navbar-menu-button"),
  newExpectationWithClickFlow(
    "should show menu button and open nav on mobile",
    "[data-cy=mobile-navbar-menu-button]",
    beVisible,
    mobileNavbarClickFlow(loggedIn),
  ),
];
