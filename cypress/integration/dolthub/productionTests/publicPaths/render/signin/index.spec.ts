import { runTestsForDevices } from "../../../../../utils";
import { allDevicesDiffTestsForSignedOut } from "../../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
  scrollToXY,
} from "../../../../../utils/helpers";
import { Expectation } from "../../../../../utils/types";

const pageName = "Sign in page";
const currentPage = "/signin";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

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

  const signupTests: Expectation[] = [
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
  ];

  const signinTests: Expectation[] = [
    newExpectation(
      "should have google signin button",
      "[data-cy=signin-signin-google]",
      beVisible,
    ),
    newExpectation(
      "should have github signin button",
      "[data-cy=signin-signin-github]",
      beVisible,
    ),
    newExpectation(
      "should have email input",
      "[data-cy=signin-email-form] input",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
    newExpectation(
      "should have email button",
      "[data-cy=signin-with-email-button]",
      newShouldArgs("be.disabled"),
    ),
    newExpectationWithClickFlows(
      "should have forgot password button",
      "[data-cy=signin-forgot-password]",
      beVisible,
      [newClickFlow("[data-cy=signin-forgot-password]", [])],
    ),
    newExpectation(
      "should have disabled recover password button",
      "[data-cy=recover-password-submit-button]",
      newShouldArgs("be.disabled"),
    ),
    newExpectationWithClickFlows(
      "should have cancel button that closes modal",
      "[data-cy=recover-cancel]",
      beVisible,
      [newClickFlow("[data-cy=recover-cancel]", [])],
    ),
  ];

  const testSections = [
    newExpectation(
      "should have Data Community section",
      "[data-cy=signin-data-community]",
      newShouldArgs("be.visible.and.contain", "Be part of our data community"),
    ),
    newExpectation(
      "should have 3 bullets in Why Join section",
      "[data-cy=signin-data-community] > ol > li",
      newShouldArgs("be.visible.and.have.length", 3),
    ),
    newExpectation(
      "should have form section",
      "[data-cy=signin-forms]",
      beVisible,
    ),
  ];

  const tests = [
    ...testSections,
    ...signinTests,
    newExpectationWithClickFlows(
      "should have create account button tab",
      "[data-cy=signin-create-account-button]",
      beVisible,
      [newClickFlow("[data-cy=signin-create-account-button]", [])],
    ),
    ...signupTests,
  ];

  const mobileTests = [
    ...testSections,
    scrollToXY("#main-content", 0, 250),
    ...signinTests,
    newExpectationWithClickFlows(
      "should have create account button tab",
      "[data-cy=signin-create-account-button]",
      beVisible,
      [newClickFlow("[data-cy=signin-create-account-button]", [])],
    ),
    ...signupTests,
  ];

  const devices = allDevicesDiffTestsForSignedOut(
    pageName,
    tests,
    tests,
    mobileTests,
  );
  runTestsForDevices({ currentPage, devices });
});
