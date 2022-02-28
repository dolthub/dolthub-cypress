import { runTestsForDevices } from "../../../../../utils";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "../../../../../utils/devices";
import {
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../../utils/helpers";
import {
  checkRepoListForTab,
  mostRecentReposClickFlow,
  mostRecentReposClickFlowMobile,
} from "../../../../../utils/sharedTests/reposContainer";

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
  const mobileTests = [
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
      "[data-cy=discover-mobile-selector]",
      beVisible,
      [mostRecentReposClickFlowMobile],
    ),
  ];
  const devices = [
    macbook15ForAppLayout(pageName, tests),
    iPad2ForAppLayout(pageName, tests),
    iPhoneXForAppLayout(pageName, mobileTests),
  ];

  runTestsForDevices({ currentPage, devices });
});
