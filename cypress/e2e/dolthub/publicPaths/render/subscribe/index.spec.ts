import {
  beVisible,
  beVisibleAndContain,
} from "cypress/e2e/utils/sharedTests/sharedFunctionsAndVariables";
import { runTestsForDevices } from "../../../../utils";
import { allDevicesForSignedOut } from "../../../../utils/devices";
import { newExpectation } from "../../../../utils/helpers";

const pageName = "Subscribe page";
const currentPage = "/subscribe";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render mailing container",
      "[data-cy=mailing-container]",
      beVisible,
    ),
    newExpectation(
      "should find mailing header",
      "[data-cy=mailing-header]",
      beVisibleAndContain("Subscribe to our mailing list"),
    ),
    newExpectation(
      "should find mailing list msg",
      "[aria-label=mailing-list]",
      beVisibleAndContain("Join our mailing list to get product updates."),
    ),
    newExpectation(
      "should find mailchimp form",
      "[data-cy=mailing-list-form]",
      beVisible,
    ),
    newExpectation(
      "should find mailchimp email input",
      "[data-cy=mailchimp-input",
      beVisible,
    ),
    newExpectation(
      "should find mailchimp submit button",
      "[data-cy=mailchimp-submit-button]",
      beVisibleAndContain("Submit"),
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  runTestsForDevices({ currentPage, devices });
});
