import { newExpectation } from "../../../../utils/helpers";
import {
  beVisibleAndContain,
  shouldFindAndBeVisible,
  shouldFindAndContain,
} from "../../../../utils/sharedTests/sharedFunctionsAndVariables";
import { runTestsForDevices } from "../../../../utils";
import { allDevicesForSignedOut } from "../../../../utils/devices";

const pageName = "Subscribe page";
const currentPage = "/subscribe";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldFindAndBeVisible("mailing-container"),
    shouldFindAndContain("mailing-header", "Subscribe to our mailing list"),

    newExpectation(
      "should find mailing list msg",
      "[aria-label=mailing-list]",
      beVisibleAndContain("Join our mailing list to get product updates."),
    ),

    shouldFindAndBeVisible("mailing-list-form"),
    shouldFindAndBeVisible("mailchimp-input"),
    shouldFindAndContain("mailchimp-submit-button", "Submit"),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  runTestsForDevices({ currentPage, devices });
});
