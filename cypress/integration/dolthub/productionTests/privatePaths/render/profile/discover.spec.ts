import { checkForkList } from "cypress/integration/utils/sharedTests/reposContainer";
import { runTestsForDevices } from "../../../../../utils";
import {
  iPad2,
  iPhoneX,
  macbook15ForAppLayout,
} from "../../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../../utils/helpers";

const pageName = "Profile discover page";
const searchTerm = "repo_with_tags_and_branches";
const currentPage = `/profile/discover?q=${searchTerm}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const tests = (isMobile: boolean) => [
    newExpectation(
      "should render repository list",
      "[data-cy=repository-list-most-recent]",
      beVisible,
    ),
    newExpectation(
      "should render create database button",
      "[data-cy=create-database-button]",
      beVisible,
    ),
    newExpectation(
      "should render search input",
      "[data-cy=search-input]",
      beVisible,
    ),
    newExpectation(
      "should render sort select dropdown",
      "[data-cy=sort-discover-select]",
      beVisible,
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
      "[data-cy=search-input]",
      beVisible,
    ),
    newExpectation(
      "should render sort select dropdown",
      "[data-cy=sort-discover-select]",
      beVisible,
    ),
    ...checkForkList(true),
  ];
  const skip = false;
  const devices = [
    macbook15ForAppLayout(pageName, tests(false), false, loggedIn),
    iPad2(pageName, ipadTests, loggedIn),
    iPhoneX(pageName, tests(true), loggedIn),
  ];
  runTestsForDevices({ currentPage, devices, skip });
});
