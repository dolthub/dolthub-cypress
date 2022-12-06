import { desktopDevicesForSignedOut, iPhoneX } from "@utils/devices";
import { newClickFlow, newExpectationWithClickFlows } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisible,
  shouldBeVisible,
} from "@utils/sharedTests/sharedFunctionsAndVariables";
import { Expectation } from "@utils/types";

const pageName = "Compare page";
const currentPage = "/compare";

type SwitchTest = {
  routeTo: string;
  find: string;
};

function getSwitchTests(isMobile: boolean): SwitchTest[] {
  const switchTests = [
    {
      routeTo: "to-compare",
      find: isMobile ? "mobile-table-container" : "table-container",
    },
    { routeTo: "to-pricing", find: "dolt-card" },
  ];
  return switchTests;
}

describe(`${pageName} renders expected components on different devices`, () => {
  function getTests(isMobile: boolean): Expectation[] {
    return getSwitchTests(isMobile)
      .map(test => [
        newExpectationWithClickFlows(
          "should show and find Toggle",
          `[data-cy=${test.routeTo}]`,
          beVisible,
          [
            newClickFlow(`[data-cy=${test.routeTo}]`, [
              shouldBeVisible(test.routeTo),
            ]),
          ],
        ),
        shouldBeVisible(test.routeTo),
      ])
      .flat();
  }

  const desktopDevices = desktopDevicesForSignedOut(pageName, getTests(false));
  const iphone = iPhoneX(pageName, getTests(true), false);

  const skip = false;
  runTestsForDevices({
    currentPage,
    devices: [...desktopDevices, iphone],
    skip,
  });
});
