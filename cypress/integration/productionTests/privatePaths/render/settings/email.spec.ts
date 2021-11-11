import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Email Settings";
const currentPage = "/settings/email";

const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render Settings header",
      "[data-cy=settings-header]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render Settings Email link",
      "[data-cy=settings-email-section-link]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render a paragraph encouraging the user to have a fallback email",
      "[data-cy=email-settings-description]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render a table of user emails",
      "[data-cy=email-table]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render an input for email",
      "[data-cy=email-input]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render a disabled add email button",
      "[data-cy=add-email-settings]",
      newShouldArgs("be.disabled"),
    ),
  ];
  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip });
});
