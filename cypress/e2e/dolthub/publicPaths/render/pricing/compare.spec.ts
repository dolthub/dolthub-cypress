import { desktopDevicesForSignedOut, iPhoneX } from "@utils/devices";
import { newExpectationWithScrollIntoView } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisible,
  shouldBeVisible,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Switch between Compare page and Pricing Page";
const currentPage = "/compare";

const pricingTests = [
  "dolt-pricing",
  "hosted-dolt-pricing",
  "dolthub-pricing",
  "doltlab-pricing",
];

describe(`${pageName} renders expected components on different devices`, () => {
  const desktopTests = [
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

  const desktopDevices = desktopDevicesForSignedOut(pageName, desktopTests);
  const iphone = iPhoneX(pageName, mobileTests, false);

  const skip = false;
  runTestsForDevices({
    currentPage,
    devices: [...desktopDevices, iphone],
    skip,
  });
});
