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
  "[data-cy=navbar-documentation]",
  "[data-cy=navbar-blog]",
  "[data-cy=navbar-logo]",
  "[data-cy=discord-link]",
  "[data-cy=github-link]",
  "[data-cy=navbar-pricing]",
  "[data-cy=navbar-databases]",
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
      ...(loggedIn
        ? [
            newExpectation(
              "should show DoltHub sign out button",
              "[data-cy=mobile-navbar-links] button",
              beVisibleAndContain("Sign Out"),
            ),
            newExpectation(
              "should show DoltHub links",
              "[data-cy=mobile-navbar-links] > a",
              newShouldArgs("be.visible.and.have.length.of.at.least", 5),
            ),
          ]
        : [
            newExpectation(
              "should show DoltHub links",
              "[data-cy=mobile-navbar-links] > a",
              newShouldArgs("be.visible.and.have.length.of.at.least", 4),
            ),
          ]),
      newExpectation(
        "should show DoltHub links",
        "[data-cy=mobile-navbar-links] > a",
        newShouldArgs("be.visible.and.have.length.of.at.least", 5),
      ),
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
