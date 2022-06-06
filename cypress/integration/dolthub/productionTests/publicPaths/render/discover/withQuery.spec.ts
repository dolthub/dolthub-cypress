import { runTestsForDevices } from "../../../../../utils";
import { allDevicesForSignedOut } from "../../../../../utils/devices";
import {
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../../../../../utils/helpers";
import {
  checkRepoListForTab,
  clearSearchClickFlow,
} from "../../../../../utils/sharedTests/reposContainer";

const pageName = "Discover page with query";
const searchTerm = "automated_testing";
const currentPage = `/discover?q=${searchTerm}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should have repos container",
      "[data-cy=repos-container-with-tabs]",
      newShouldArgs("be.visible.and.contain", ["Featured", "Discover"]),
    ),
    ...checkRepoListForTab("most-recent", 8),
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
    newExpectationWithScrollIntoView(
      "should scroll to footer",
      "[data-cy=site-footer]",
      beVisible,
      true,
    ),
    ...checkRepoListForTab("most-recent", 40),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  runTestsForDevices({ currentPage, devices });
});
