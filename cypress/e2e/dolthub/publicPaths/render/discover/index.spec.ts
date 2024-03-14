import {
  checkRepoListForTab,
  mostRecentReposClickFlow,
  mostRecentReposClickFlowMobile,
} from "@sharedTests/reposContainer";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "@utils/devices";
import { newExpectationWithClickFlow, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { shouldBeVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Discover page";
const currentPage = "/discover";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    shouldBeVisible("repolist-search-input"),
    shouldBeVisible("repos-container-with-tabs"),
    ...checkRepoListForTab("featured", 5),
    newExpectationWithClickFlow(
      "should have list of most-recent repos",
      "[data-cy=discover-repos-tab]",
      beVisible,
      mostRecentReposClickFlow,
    ),
  ];
  const mobileTests = [
    shouldBeVisible("repolist-search-input"),
    shouldBeVisible("repos-container-with-tabs"),
    ...checkRepoListForTab("featured", 5),
    newExpectationWithClickFlow(
      "should have list of most-recent repos",
      "[data-cy=databases-layout-mobile-selector]",
      beVisible,
      mostRecentReposClickFlowMobile,
    ),
  ];
  const devices = [
    macbook15ForAppLayout(pageName, tests),
    iPad2ForAppLayout(pageName, tests),
    iPhoneXForAppLayout(pageName, mobileTests),
  ];

  runTestsForDevices({ currentPage, devices });
});
