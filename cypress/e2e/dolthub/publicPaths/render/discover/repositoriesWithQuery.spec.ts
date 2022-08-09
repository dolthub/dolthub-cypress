import { runTestsForDevices } from "../../../../utils";
import { allDevicesForSignedOut } from "../../../../utils/devices";
import {
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../../../../utils/helpers";
import {
  checkForkList,
  checkRepoListForTab,
  clearSearchClickFlow,
} from "../../../../utils/sharedTests/reposContainer";

const pageName = "Repositories page with query";
const searchTerm = "repo_with_tags_and_branches";
const currentPage = `/repositories/${searchTerm}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = (isMobile: boolean) => [
    newExpectation(
      "should have repos container",
      "[data-cy=repos-container-with-tabs]",
      newShouldArgs("be.visible.and.contain", ["Featured", "Discover"]),
    ),
    ...checkRepoListForTab("most-recent", 1),
    ...checkForkList(isMobile),
    newExpectationWithScrollIntoView(
      "should scroll search bar into view",
      "[data-cy=search-input]",
      beVisible,
      true,
    ),
    newExpectation(
      "should have repository search bar with query",
      "[data-cy=search-input]",
      newShouldArgs("be.visible.and.have.value", searchTerm),
    ),
    newExpectationWithClickFlows(
      "should successfully clear search",
      "[data-cy=clear-search-button]",
      beVisible,
      [clearSearchClickFlow],
    ),
    ...checkRepoListForTab("most-recent", 20),
  ];

  const devices = allDevicesForSignedOut(pageName, tests(false), tests(true));

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
