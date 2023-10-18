import {
  // checkForkList,
  uncheckShowForkListOption,
} from "@sharedTests/reposContainer";
import { iPad2, iPhoneX, macbook15ForAppLayout } from "@utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Profile discover page";
const searchTerm = "repo_with_tags_and_branches";
const currentPage = `/profile/discover?q=${searchTerm}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const tests = [
    newExpectationWithScrollIntoView(
      "should render repository list",
      "[data-cy=repository-list-most-recent]",
      beVisible,
      true,
    ),
    newExpectation(
      "should render create database button",
      "[data-cy=create-database-button]",
      beVisible,
    ),
    newExpectationWithScrollIntoView(
      "should scroll search input into view",
      "[data-cy=repolist-search-input]",
      beVisible,
      true,
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
      newShouldArgs("be.visible.and.have.length.of.at.most", 2),
    ),
    // we will add it back when we have a way to check for forked repos
    // ...checkForkList(isMobile),
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
      newShouldArgs("be.visible.and.have.length.of.at.most", 2),
    ),
    // ...checkForkList(true),
  ];

  const skip = false;
  const devices = [
    macbook15ForAppLayout(pageName, tests, false, loggedIn),
    iPad2(pageName, ipadTests),
    iPhoneX(pageName, tests),
  ];
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
