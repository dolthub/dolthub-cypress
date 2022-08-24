import { runTestsForDevices } from "../../../../utils";
import { allDevicesForSignedOut } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Privacy policy page";
const currentPage = "/privacy-policy";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render privacy policy page with title",
      "[data-cy=privacy-policy-page] header",
      newShouldArgs("be.visible.and.contain", [
        "Privacy Policy",
        "Last Updated:",
      ]),
    ),
    newExpectation(
      "should render privacy policy page with 8 sections",
      "[data-cy=privacy-policy-page] section",
      newShouldArgs("be.visible.and.have.length", 8),
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  runTestsForDevices({ currentPage, devices });
});
