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
    { routeTo: "to-compare", find: "table-container" },
    { routeTo: "to-pricing", find: "dolt-card" },
  ];
  if (isMobile) {
    switchTests[0].find = `mobile-${switchTests[0].find}`;
  }
  return switchTests;
}

describe(`${pageName} renders expected components on different devices`, () => {
  function getTests(isMobile: boolean): Expectation[] {
    return getSwitchTests(isMobile)
      .map(test => [
        newExpectationWithClickFlows(
          "should show and find ToggleButton",
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
