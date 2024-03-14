import {
  checkForkList,
  uncheckShowForkListOption,
} from "@sharedTests/reposContainer";
import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  shouldBeVisible,
  shouldBeVisibleAndScrollIntoView,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Profile discover page";
const searchTerm = "repo_with_tags_and_branches";
const currentPage = `/profile/discover?q=${searchTerm}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = (isMobile: boolean) => [
    shouldBeVisible("create-database-button"),
    shouldBeVisible("repolist-search-input"),
    shouldBeVisibleAndScrollIntoView("repository-list-most-recent"),
    shouldBeVisible("filter-button"),
    uncheckShowForkListOption,
    shouldBeVisibleAndScrollIntoView("repository-list-most-recent"),
    newExpectation(
      "should only have one repo in the list",
      "[data-cy=repository-list-most-recent]>li",
      newShouldArgs("be.visible.and.have.length.of.at.most", 1),
    ),
    ...checkForkList(isMobile),
  ];

  const skip = false;
  const devices = allDevicesForAppLayout(
    pageName,
    tests(false),
    tests(true),
    true,
    loggedIn,
  );
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
