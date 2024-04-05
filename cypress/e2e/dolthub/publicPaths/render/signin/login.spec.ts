import { macbook15 } from "@utils/devices";
import { newExpectationWithTypeString, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { shouldBeVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Sign in page with log in";
const currentPage = "/signin";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    shouldBeVisible("signin-email-form"),
    newExpectationWithTypeString(
      "should input invalid username and get error",
      "input[name=username]",
      beVisible,
      { value: "invalid^username" },
    ),
    newExpectationWithTypeString(
      "should input password and enter",
      "input[name=password]",
      beVisible,
      { value: "password123{enter}" }, // should also maybe test clicking on button too
    ),
    shouldBeVisible("error-msg"),
  ];

  const devices = [macbook15(pageName, tests)];
  runTestsForDevices({ currentPage, devices });
});
