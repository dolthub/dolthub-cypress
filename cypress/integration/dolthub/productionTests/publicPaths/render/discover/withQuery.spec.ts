import { runTestsForDevices } from "../../../../../utils";
import { allDevicesForSignedOut } from "../../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../../utils/helpers";
import {
  checkRepoListForTab,
  clearSearchTest,
} from "../../../../../utils/sharedTests/reposContainer";

const pageName = "Discover page with query";
const searchTerm = "automated_testing";
const currentPage = `/discover?q=${searchTerm}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const searchTests = [
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
  ];
  const tests = (skip: boolean) =>
    skip ? searchTests : [...searchTests, ...clearSearchTest];

  const skip = true;
  const devices = allDevicesForSignedOut(pageName, tests(skip), tests(skip));

  runTestsForDevices({ currentPage, devices });
});
