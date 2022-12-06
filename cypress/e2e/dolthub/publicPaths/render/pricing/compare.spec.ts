import { allDevicesDiffTestsForSignedOut } from "@utils/devices";
import { newExpectationWithScrollIntoView } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisible,
  shouldBeVisible,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Compare page";
const currentPage = "/compare";

const pricingTests = [
  "dolt-pricing",
  "hosted-dolt-pricing",
  "dolthub-pricing",
  "doltlab-pricing",
];

describe(`${pageName} renders expected components on different devices`, () => {
  const desktopAndIpadTests = [
    shouldBeVisible("desktop-table-container"),
    ...pricingTests.map(datacy => shouldBeVisible(datacy)),
  ];

  const mobileTests = [
    shouldBeVisible("mobile-table-container"),
    ...pricingTests.map(datacy =>
      newExpectationWithScrollIntoView(
        `should find and scroll to ${datacy} section`,
        `[data-cy=mobile-${datacy}]`,
        beVisible,
        true,
      ),
    ),
  ];

  const devices = allDevicesDiffTestsForSignedOut(
    pageName,
    desktopAndIpadTests,
    desktopAndIpadTests,
    mobileTests,
  );

  const skip = false;
  runTestsForDevices({
    currentPage,
    devices,
    skip,
  });
});
