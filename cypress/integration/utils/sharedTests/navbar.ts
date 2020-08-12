import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../utils";

const shouldArgs = newShouldArgs("be.visible");

const signedOutNavbarLinks = [
  "[data-cy=navbar-discover]",
  "[data-cy=navbar-pricing]",
  "[data-cy=navbar-documentation]",
  "[data-cy=navbar-logo]",
  "[data-cy=navbar-about-dolt]",
  "[data-cy=navbar-blog]",
  "[data-cy=navbar-signin]",
];

export const pricingModalClickFlow = (initialClickDataCy: string) =>
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

export const testSignedOutNavbar = [
  newExpectation(
    "should have signed out navbar and correct links",
    signedOutNavbarLinks,
    shouldArgs,
  ),
  newExpectationWithClickFlows(
    "should open pricing modal in navbar",
    "[data-cy=navbar-pricing-button]",
    shouldArgs,
    [pricingModalClickFlow("[data-cy=navbar-pricing-button]")],
  ),
  newExpectation(
    "should have DoltHub logo in navbar",
    "[data-cy=navbar-logo]",
    shouldArgs,
  ),
];

const mobileNavbarClickFlow = newClickFlow(
  "[data-cy=mobile-navbar-menu-button]",
  [
    newExpectation(
      "should show DoltHub links",
      "[data-cy=mobile-navbar-links] > li",
      newShouldArgs("be.visible.and.have.length", 6),
    ),
    newExpectation(
      "should show social links",
      "[data-cy=mobile-navbar-social-links] > a",
      newShouldArgs("be.visible.and.have.length", 4),
    ),
  ],
  "[data-cy=mobile-navbar-close-button]",
);

export const testMobileNavbar = [
  newExpectationWithClickFlows(
    "should show menu button on mobile",
    "[data-cy=mobile-navbar-menu-button]",
    shouldArgs,
    [mobileNavbarClickFlow],
  ),
];
