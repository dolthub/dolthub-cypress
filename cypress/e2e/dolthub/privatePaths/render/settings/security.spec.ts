import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Security Settings";
const currentPage = "/settings/security";

const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render Settings header",
      "[data-cy=settings-header]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render Settings Security link",
      "[data-cy=settings-security-section-link]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have a Change Password header",
      "[data-cy=change-password-header]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render an input for old password",
      "[data-cy=old-password-input]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render an input for new password",
      "[data-cy=new-password-input]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render an input for confirm password",
      "[data-cy=confirm-password-input]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render a disabled update password button",
      "[data-cy=update-password-button]",
      newShouldArgs("be.disabled"),
    ),
    newExpectation(
      "should have a cancel button",
      "[data-cy=cancel-button]",
      newShouldArgs("be.visible"),
    ),
  ];
  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
