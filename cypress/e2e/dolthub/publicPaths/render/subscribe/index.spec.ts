import {
  beVisibleAndContain,
  shouldBeVisible,
  shouldFindAndContain,
} from "@sharedTests/sharedFunctionsAndVariables";
import { allDevicesForSignedOut } from "@utils/devices";
import { newExpectation } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Subscribe page";
const currentPage = "/subscribe";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldBeVisible("mailing-container"),
    shouldFindAndContain("mailing-header", "Subscribe to our mailing list"),

    newExpectation(
      "should find mailing list msg",
      "[aria-label=mailing-list]",
      beVisibleAndContain("Join our mailing list to get product updates."),
    ),

    shouldBeVisible("mailing-list-form"),
    shouldBeVisible("mailchimp-input"),
    shouldFindAndContain("mailchimp-submit-button", "Submit"),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  runTestsForDevices({ currentPage, devices });
});
