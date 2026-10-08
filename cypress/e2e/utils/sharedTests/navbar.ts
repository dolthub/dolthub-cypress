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

const mobileAccountLinks: Tests = [
  ['[href="/settings"]', "Settings"],
  ['[href="/profile"]', "My Databases"],
  ['[href^="/users/"][href$="/organizations"]', "My Organizations"],
  ['[href="/contact"]', "Contact DoltHub"],
  ['[href="/terms"]', "Terms of Service"],
  ['[href="/privacy-policy"]', "Privacy Policy"],
].map(([hrefSelector, label]) =>
  newExpectation(
    `should show the ${label} account link with its correct destination`,
    `[aria-label="mobile-navbar-account-links"] a${hrefSelector}`,
    beVisibleAndContain(label),
  ),
);

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
            ...mobileAccountLinks,
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
  // The current-user query replaces the initial signed-out navbar. Wait for
  // that replacement before clicking, otherwise its open-menu state is lost.
  ...(loggedIn
    ? [
        newExpectation(
          "should finish loading the signed-in navbar",
          "[data-cy=navbar-menu-avatar]",
          newShouldArgs("exist"),
        ),
      ]
    : []),
  shouldBeVisible("mobile-navbar-menu-button"),
  newExpectationWithClickFlow(
    "should show menu button and open nav on mobile",
    "[data-cy=mobile-navbar-menu-button]",
    beVisible,
    mobileNavbarClickFlow(loggedIn),
  ),
];
