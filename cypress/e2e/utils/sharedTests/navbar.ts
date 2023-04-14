import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

const beVisible = newShouldArgs("be.visible");

const sharedLinks = [
  "[data-cy=navbar-documentation]",
  "[data-cy=navbar-blog]",
  "[data-cy=navbar-logo]",
  "[data-cy=navbar-discord]",
  "[data-cy=navbar-github]",
  "[data-cy=navbar-bounties]",
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
  newExpectation(
    "should have user avatar",
    "[data-cy=navbar-menu-avatar]",
    beVisible,
  ),
];

export const testSignedOutDoltLabNavbar: Tests = [
  newExpectation(
    "should have signed out navbar and correct links",
    signedOutDoltLabNavbarLinks,
    beVisible,
  ),
];

const mobileNavbarClickFlow = newClickFlow(
  "[data-cy=mobile-navbar-menu-button]",
  [
    newExpectation(
      "should show DoltHub links",
      "[data-cy=mobile-navbar-links] > li",
      newShouldArgs("be.visible.and.have.length.of.at.least", 7),
    ),
    newExpectation(
      "should show social links",
      "[data-cy=mobile-navbar-social-links] > a",
      newShouldArgs("be.visible.and.have.length", 4),
    ),
  ],
  "[data-cy=mobile-navbar-close-button]",
);

export const testMobileNavbar: Tests = [
  newExpectationWithScrollIntoView(
    "should scroll to and show menu button on mobile",
    "[data-cy=mobile-navbar-menu-button]",
    beVisible,
    true,
  ),
  newExpectationWithClickFlows(
    "should show menu button and open nav on mobile",
    "[data-cy=mobile-navbar-menu-button]",
    beVisible,
    [mobileNavbarClickFlow],
  ),
];
