import { runTestsForDevices } from "../../../../utils";
import { allDevicesForSignedOut } from "../../../../utils/devices";
import {
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";
import {
  checkRepoListForTab,
  mostRecentReposClickFlow,
} from "../../../../utils/sharedTests/reposContainer";

const pageName = "Discover page";
const currentPage = "/discover";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should have repository search input",
      "[data-cy=search-input]",
      beVisible,
    ),
    newExpectation(
      "should have repos container",
      "[data-cy=repos-container-with-tabs]",
      newShouldArgs("be.visible.and.contain", ["Featured", "Discover"]),
    ),
    ...checkRepoListForTab("featured", 5),
    newExpectationWithClickFlows(
      "should have list of most-recent repos",
      "[data-cy=discover-repos-tab]",
      beVisible,
      [mostRecentReposClickFlow],
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  runTestsForDevices({ currentPage, devices });
});
