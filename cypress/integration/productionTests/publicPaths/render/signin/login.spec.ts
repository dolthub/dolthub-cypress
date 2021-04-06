import { runTestsForDevices } from "../../../../utils";
import { macbook15 } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithTypeString,
  newShouldArgs,
} from "../../../../utils/helpers";

const pageName = "Sign in page with log in";
const currentPage = "/signin";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const signInModalClickFlow = newClickFlow(
    "[data-cy=signin-button]",
    [
      newExpectation("", "[data-cy=signin-email-form]", beVisible),
      newExpectationWithTypeString(
        "",
        "input[name=username]",
        beVisible,
        "invalid^username",
      ),
      newExpectationWithTypeString(
        "",
        "input[name=password]",
        beVisible,
        "password123{enter}", // should also maybe test clicking on button too
      ),
      newExpectation("", "[data-cy=error-msg]", beVisible),
    ],
    "[data-cy=signin-cancel]",
  );

  const tests = [
    newExpectationWithClickFlows(
      "should click on signin button",
      "[data-cy=signin-button]",
      beVisible,
      [signInModalClickFlow],
    ),
  ];

  const devices = [macbook15(pageName, tests, false)];
  runTestsForDevices({ currentPage, devices });
});
