import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";
import { ClickFlow, Tests } from "../types";

const beVisible = newShouldArgs("be.visible");

const signedOutNavbarLinks = [
  "[data-cy=navbar-discover]",
  "[data-cy=navbar-pricing]",
  "[data-cy=navbar-documentation]",
  "[data-cy=navbar-blog]",
  "[data-cy=navbar-logo]",
  "[data-cy=navbar-about-dolt]",
  "[data-cy=navbar-discord]",
  "[data-cy=navbar-signin]",
];

export const pricingModalClickFlow = (initialClickDataCy: string): ClickFlow =>
  newClickFlow(
    initialClickDataCy,
    [
      newExpectation(
        "",
        "[data-cy=pricing-info]",
        newShouldArgs("be.visible.and.contain", [
          "Pricing",
          "DoltHub Basic",
          "DoltHub Pro",
        ]),
      ),
    ],
    "[data-cy=close-modal]",
  );

export const testSignedOutNavbar: Tests = [
  newExpectation(
    "should have signed out navbar and correct links",
    signedOutNavbarLinks,
    beVisible,
  ),
  newExpectationWithClickFlows(
    "should open pricing modal in navbar",
    "[data-cy=navbar-pricing-button]",
    beVisible,
    [pricingModalClickFlow("[data-cy=navbar-pricing-button]")],
  ),
  newExpectation(
    "should have DoltHub logo in navbar",
    "[data-cy=navbar-logo]",
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
