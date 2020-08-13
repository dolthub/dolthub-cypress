import { runTestsForDevices } from "../../../../utils";
import { allDevicesDiffTestsForSignedOut } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
  scrollToPosition,
} from "../../../../utils/helpers";
import { ClickFlow } from "../../../../utils/types";

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

  const signupClickFlow = (closeDataCy: string): ClickFlow =>
    newClickFlow(
      "[data-cy=signup-for-dolthub]",
      [
        newExpectation("", "[data-cy=signin-create-account-google]", beVisible),
        newExpectation("", "[data-cy=signin-create-account-github]", beVisible),
        newExpectationWithClickFlows(
          "",
          "[data-cy=signin-create-account-email]",
          beVisible,
          [signupFormClickFlow],
        ),
        newExpectation("", "[data-cy=signin-have-account]", beVisible),
      ],
      closeDataCy,
    );

  const recoverPasswordClickFlow = newClickFlow(
    "[data-cy=signin-forgot-password]",
    [
      newExpectation(
        "",
        "[data-cy=recover-password-form] input",
        newShouldArgs("be.visible.and.have.length", 1),
      ),
      newExpectation(
        "",
        "[data-cy=recover-password-submit-button]",
        newShouldArgs("be.disabled"),
      ),
    ],
    "",
  );

  const signinClickFlow = (closeDataCy: string): ClickFlow =>
    newClickFlow(
      "[data-cy=signin-button]",
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
          [recoverPasswordClickFlow],
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
      "should have Sign in modal",
      "[data-cy=signin-button]",
      beVisible,
      [signinClickFlow("[data-cy=close-modal]")],
    ),
    scrollToPosition("#main-content", "top"),
    newExpectationWithClickFlows(
      "should have Sign up for DoltHub modal",
      "[data-cy=signup-for-dolthub]",
      beVisible,
      [signupClickFlow("[data-cy=close-modal]")],
    ),
  ];

  const mobileTests = [
    ...testSections,
    newExpectationWithClickFlows(
      "should have Sign up for DoltHub modal",
      "[data-cy=signup-for-dolthub]",
      beVisible,
      [signupClickFlow("[data-cy=create-account-cancel]")],
    ),
    newExpectationWithClickFlows(
      "should have Sign in modal",
      "[data-cy=signin-button]",
      beVisible,
      [signinClickFlow("[data-cy=recover-cancel]")],
    ),
  ];

  const devices = allDevicesDiffTestsForSignedOut(
    pageName,
    tests,
    tests,
    mobileTests,
  );

  runTestsForDevices({ currentPage, devices });
});
