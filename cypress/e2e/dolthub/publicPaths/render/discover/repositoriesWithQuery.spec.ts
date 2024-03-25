import {
  checkRepoListForTab,
  clearSearchClickFlow,
  shouldUncheckForkListOption,
} from "@sharedTests/reposContainer";
import { allDevicesForSignedOut } from "@utils/devices";
import {
  newExpectation,
  newExpectationWithClickFlow,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { shouldBeVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Repositories page with query";
const searchTerm = "repo_with_tags_and_branches";
const currentPage = `/repositories/${searchTerm}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    shouldBeVisible("repos-container-with-tabs"),
    shouldUncheckForkListOption,
    ...checkRepoListForTab("most-recent", 1),

    newExpectationWithScrollIntoView(
      "should scroll search bar into view",
      "[data-cy=repolist-search-input]",
      beVisible,
      true,
    ),
    newExpectation(
      "should have repository search bar with query",
      "[data-cy=repolist-search-input]",
      newShouldArgs("be.visible.and.have.value", searchTerm),
    ),
    newExpectationWithClickFlow(
      "should successfully clear search",
      "[data-cy=clear-repolist-search]",
      beVisible,
      clearSearchClickFlow,
    ),
    ...checkRepoListForTab("most-recent", 15),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
