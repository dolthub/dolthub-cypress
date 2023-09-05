import {
  checkForkList,
  uncheckShowForkListOption,
} from "@sharedTests/reposContainer";
import { iPad2, iPhoneX, macbook15ForAppLayout } from "@utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
  scrollToPosition,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Profile discover page";
const searchTerm = "repo_with_tags_and_branches";
const currentPage = `/profile/discover?q=${searchTerm}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const tests = (isMobile: boolean) => [
    newExpectationWithScrollIntoView(
      "should render repository list",
      "[data-cy=repository-list-most-recent]",
      beVisible,
      true,
    ),
    scrollToPosition("#main-content", "top"),
    newExpectation(
      "should render create database button",
      "[data-cy=create-database-button]",
      beVisible,
    ),
    newExpectation(
      "should render search input",
      "[data-cy=repolist-search-input]",
      beVisible,
    ),
    newExpectation(
      "should render sort select dropdown",
      "[data-cy=sort-discover-select]",
      beVisible,
    ),
    uncheckShowForkListOption,
    newExpectationWithScrollIntoView(
      "should render repository list",
      "[data-cy=repository-list-most-recent]",
      beVisible,
      true,
    ),
    newExpectation(
      "should only have one repo in the list",
      "[data-cy=repository-list-most-recent]>li",
      newShouldArgs("be.visible.and.have.length.of.at.most", 1),
    ),
    ...checkForkList(isMobile),
  ];
  const ipadTests = [
    newExpectation(
      "should render repository list",
      "[data-cy=repository-list-most-recent]",
      beVisible,
    ),
    newExpectation(
      "should not render create database button",
      "[data-cy=create-database-button]",
      newShouldArgs("not.be.visible"),
    ),
    newExpectation(
      "should render search input",
      "[data-cy=repolist-search-input]",
      beVisible,
    ),
    newExpectation(
      "should render sort select dropdown",
      "[data-cy=sort-discover-select]",
      beVisible,
    ),
    uncheckShowForkListOption,
    newExpectation(
      "should only have one repo in the list",
      "[data-cy=repository-list-most-recent]>li",
      newShouldArgs("be.visible.and.have.length.of.at.most", 1),
    ),
    ...checkForkList(true),
  ];

  const skip = false;
  const devices = [
    macbook15ForAppLayout(pageName, tests(false), false, loggedIn),
    iPad2(pageName, ipadTests),
    iPhoneX(pageName, tests(true)),
  ];
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
