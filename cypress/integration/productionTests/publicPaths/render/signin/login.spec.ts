import { runTestsForDevices } from "../../../../utils";
import { macbook15 } from "../../../../utils/devices";
import {
  newExpectation,
  newExpectationWithTypeString,
  newShouldArgs,
} from "../../../../utils/helpers";

const pageName = "Sign in page with log in";
const currentPage = "/signin";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should have signin email form",
      "[data-cy=signin-email-form]",
      beVisible,
    ),
    newExpectationWithTypeString(
      "should input invalid username and get error",
      "input[name=username]",
      beVisible,
      "invalid^username",
    ),
    newExpectationWithTypeString(
      "should input password and enter",
      "input[name=password]",
      beVisible,
      "password123{enter}", // should also maybe test clicking on button too
    ),
    newExpectation(
      "should have error message",
      "[data-cy=error-msg]",
      beVisible,
    ),
  ];

  const devices = [macbook15(pageName, tests, false)];
  runTestsForDevices({ currentPage, devices });
});
