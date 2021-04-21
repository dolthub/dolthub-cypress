import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

const beVisible = newShouldArgs("be.visible");

const sharedLinks = [
  "[data-cy=navbar-documentation]",
  "[data-cy=navbar-blog]",
  "[data-cy=navbar-logo]",
  "[data-cy=navbar-discord]",
  "[data-cy=navbar-about-dolt]",
  "[data-cy=navbar-bounties]",
  "[data-cy=navbar-pricing]",
];

const signedOutNavbarLinks = [
  ...sharedLinks,
  "[data-cy=navbar-discover]",
  "[data-cy=navbar-signin]",
];

const signedInNavbarLinks = [...sharedLinks, "[data-cy=navbar-repositories]"];

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

const mobileNavbarClickFlow = newClickFlow(
  "[data-cy=mobile-navbar-menu-button]",
  [
    newExpectation(
      "should show DoltHub links",
      "[data-cy=mobile-navbar-links] > li",
      newShouldArgs("be.visible.and.have.length", 7),
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
  newExpectationWithClickFlows(
    "should show menu button on mobile",
    "[data-cy=mobile-navbar-menu-button]",
    beVisible,
    [mobileNavbarClickFlow],
  ),
];
