import { allDevicesForSignedOut } from "@utils/devices";
import { newClickFlow, newExpectationWithClickFlows } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisible,
  shouldBeVisible,
} from "@utils/sharedTests/sharedFunctionsAndVariables";
import { Expectation } from "@utils/types";

const pageName = "Switch between Compare page and Pricing Page";
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
    return getSwitchTests(isMobile).map(test =>
      newExpectationWithClickFlows(
        `should route to ${test.routeTo} and find ${test.find}`,
        `[data-cy=${test.routeTo}]`,
        beVisible,
        [
          newClickFlow(`[data-cy=${test.routeTo}]`, [
            shouldBeVisible(test.routeTo),
          ]),
        ],
      ),
    );
  }

  const devices = allDevicesForSignedOut(
    pageName,
    getTests(false),
    getTests(true),
  );

  const skip = false;
  runTestsForDevices({
    currentPage,
    devices,
    skip,
  });
});
