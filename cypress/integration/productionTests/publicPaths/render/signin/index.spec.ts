import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForSignedOut } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
  scrollToPosition,
} from "../../../../utils/helpers";
import { ClickFlow, Expectation } from "../../../../utils/types";

const pageName = "Sign in page";
const currentPage = "/signin";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const scrollToPositionInContainer = (
    position: Cypress.PositionType,
  ): Expectation => scrollToPosition("#main-content", position);

  const signupFormClickFlow = newClickFlow(
    "[data-cy=signin-create-account-email]",
    [
      newExpectation(
        "",
        "[data-cy=signup-email-form] input",
        newShouldArgs("be.visible.and.have.length", 3),
      ),
      newExpectation(
        "",
        "[data-cy=signup-with-email-button]",
        newShouldArgs("be.disabled"),
      ),
    ],
    "[data-cy=signup-go-back]",
  );

  const signupClickFlow: Expectation[] = [
    newExpectation(
      "should have Google button to create account",
      "[data-cy=signin-create-account-google]",
      beVisible,
    ),
    newExpectation(
      "should have Github button to create account",
      "[data-cy=signin-create-account-github]",
      beVisible,
    ),
    newExpectationWithClickFlows(
      "should have form to create account with email and password",
      "[data-cy=signin-create-account-email]",
      beVisible,
      [signupFormClickFlow],
    ),
    newExpectationWithScrollIntoView(
      "should scroll back up to form",
      "[data-cy=signin-have-account]",
      newShouldArgs("exist"),
      true,
    ),
  ];

  const clickSignUpButton = newClickFlow("[data-cy=signup-for-dolthub]", []);

  const signinClickFlow = (closeDataCy: string): ClickFlow =>
    newClickFlow(
      "[data-cy=navbar-signin-button]",
      [
        newExpectation("", "[data-cy=signin-signin-google]", beVisible),
        newExpectation("", "[data-cy=signin-signin-github]", beVisible),
        newExpectation(
          "",
          "[data-cy=signin-email-form] input",
          newShouldArgs("be.visible.and.have.length", 2),
        ),
        newExpectation(
          "",
          "[data-cy=signin-with-email-button]",
          newShouldArgs("be.disabled"),
        ),
        newExpectationWithClickFlows(
          "",
          "[data-cy=signin-forgot-password]",
          beVisible,
          [newClickFlow("[data-cy=signin-forgot-password]", [])],
        ),
        newExpectationWithScrollIntoView(
          "",
          "[data-cy=recover-password-form] input",
          newShouldArgs("be.visible.and.have.length", 1),
          true,
        ),
        newExpectation(
          "",
          "[data-cy=recover-password-submit-button]",
          newShouldArgs("be.disabled"),
        ),
      ],
      closeDataCy,
    );

  const testSections = [
    newExpectation(
      "should have Why Join section",
      "[data-cy=signup-why-join]",
      newShouldArgs("be.visible.and.contain", "Why join DoltHub?"),
    ),
    newExpectation(
      "should have 3 bullets in Why Join section",
      "[data-cy=signup-why-join] > ul > li",
      newShouldArgs("be.visible.and.have.length", 3),
    ),
    newExpectation(
      "should have links at bottom of Why Join section",
      "[data-cy=why-join-links] a",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
    newExpectation(
      "should have Sign In section",
      "[data-cy=signin-section]",
      newShouldArgs("be.visible.and.contain", [
        "Already a DoltHub user?",
        "Thanks for using DoltHub.",
      ]),
    ),
  ];

  const tests = [
    ...testSections,
    newExpectationWithClickFlows(
      "should have Sign in form",
      "[data-cy=navbar-signin-button]",
      beVisible,
      [signinClickFlow("[data-cy=recover-cancel]")],
    ),
    scrollToPositionInContainer("top"),
    newExpectationWithClickFlows(
      "should have Sign up for DoltHub form",
      "[data-cy=signup-for-dolthub]",
      beVisible,
      [clickSignUpButton],
    ),
    scrollToPositionInContainer("top"),
    ...signupClickFlow,
  ];

  // const mobileTests = [
  //   ...testSections,
  //   newExpectationWithClickFlows(
  //     "should have Sign up for DoltHub form",
  //     "[data-cy=signup-for-dolthub]",
  //     beVisible,
  //     [signupClickFlow("[data-cy=create-account-cancel]")],
  //   ),
  //   newExpectationWithClickFlows(
  //     "should have Sign in form",
  //     "[data-cy=signin-button]",
  //     beVisible,
  //     [signinClickFlow("[data-cy=recover-cancel]")],
  //   ),
  // ];

  // TODO: Fix scroll containers for mobile tests
  // const devices = allDevicesDiffTestsForSignedOut(
  //   pageName,
  //   tests,
  //   tests,
  //   mobileTests,
  // );
  const devices = desktopDevicesForSignedOut(pageName, tests);
  runTestsForDevices({ currentPage, devices });
});
