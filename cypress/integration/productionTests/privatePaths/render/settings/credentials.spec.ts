import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Credentials Settings";
const currentPage = "/settings/credentials";

const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render Settings header",
      "[data-cy=settings-header]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render Settings Credentials link",
      "[data-cy=settings-credentials-section-link]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render a credentials table",
      "[data-cy=credentials-table]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have an Add Credentials header",
      "[data-cy=edit-credentials-header]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have a Description input",
      "[data-cy=description-input]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have a Public Key input",
      "[data-cy=public-key-input]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have a disabled Create button",
      "[data-cy=create-credentials-button]",
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
  runTestsForDevices({ currentPage, devices, skip });
});
