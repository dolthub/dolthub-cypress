import {
  checkRepoListForTab,
  clearSearchTest,
} from "@sharedTests/reposContainer";
import { allDevicesForSignedOut } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { shouldBeVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Discover page with query";
const searchTerm = "automated_testing";
const currentPage = `/discover?q=${searchTerm}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const searchTests = [
    shouldBeVisible("repos-container-with-tabs"),
    ...checkRepoListForTab("most-recent", 8),
    newExpectation(
      "should have repository search bar with query",
      "[data-cy=repolist-search-input]",
      newShouldArgs("be.visible.and.have.value", searchTerm),
    ),
  ];
  const tests = (skip: boolean) =>
    skip ? searchTests : [...searchTests, ...clearSearchTest];

  const skip = false;
  const devices = allDevicesForSignedOut(pageName, tests(skip), tests(skip));

  runTestsForDevices({ currentPage, devices });
});
