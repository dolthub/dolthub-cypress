import { iPad2, iPhoneX, macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Profile my repositories page";
const currentPage = "/profile";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const tests = [
    newExpectation(
      "should render repository list",
      "[data-cy=repository-list-for-user]",
      beVisible,
    ),
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
  ];
  const ipadTests = [
    newExpectation(
      "should render repository list",
      "[data-cy=repository-list-for-user]",
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
  ];
  const skip = false;
  const devices = [
    macbook15ForAppLayout(pageName, tests, false, loggedIn),
    iPad2(pageName, ipadTests),
    iPhoneX(pageName, tests),
  ];
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
