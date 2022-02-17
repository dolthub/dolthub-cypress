import { runTestsForDevices } from "../../../../../utils";
import { allDevicesForSignedOut } from "../../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../../utils/helpers";

const pageName = "Reset password page";
const fakeToken = "this-is-a-fake-token";
const currentPage = `/recover-password?token=${fakeToken}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should have reset password component with correct title",
      "[data-cy=reset-password-page]",
      newShouldArgs("be.visible.and.contain", [
        "Reset your password",
        "Please enter a new password below.",
      ]),
    ),
    newExpectation(
      "should have reset password form with inputs",
      "[data-cy=reset-password-form] input",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
    newExpectation(
      "should have new password input",
      "[data-cy=reset-password-form] div:first-of-type",
      newShouldArgs("be.visible.and.contain", "New Password"),
    ),
    newExpectation(
      "should have confirm password input",
      "[data-cy=reset-password-form] div:last-of-type",
      newShouldArgs("be.visible.and.contain", "Confirm Password"),
    ),
    newExpectation(
      "should have submit button",
      "[data-cy=reset-password-form] button",
      newShouldArgs("be.disabled"),
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  runTestsForDevices({ currentPage, devices });
});
