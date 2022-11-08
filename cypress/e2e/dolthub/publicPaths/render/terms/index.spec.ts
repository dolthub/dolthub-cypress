import { allDevicesForSignedOut } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Terms page";
const currentPage = "/terms";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render terms page with title",
      "[data-cy=terms-page] header",
      newShouldArgs("be.visible.and.contain", [
        "Terms Of Service",
        "Last Updated:",
      ]),
    ),
    newExpectation(
      "should render terms page with 24 sections",
      "[data-cy=terms-page] section",
      newShouldArgs("be.visible.and.have.length", 24),
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  runTestsForDevices({ currentPage, devices });
});
