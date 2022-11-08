import { iPad2, iPhoneX, macbook15ForAppLayout } from "@utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Profile bounties repositories page";
const currentPage = "/profile/bounties";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const tests = [
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
    newExpectationWithScrollIntoView(
      "should render completed bounty databases list",
      "[data-cy=repository-list-completed-bounties]",
      beVisible,
      true,
    ),
  ];
  const ipadTests = [
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
    newExpectationWithScrollIntoView(
      "should render completed bounty databases list",
      "[data-cy=repository-list-completed-bounties]",
      beVisible,
      true,
    ),
  ];
  const skip = false;
  const devices = [
    macbook15ForAppLayout(pageName, tests, false, loggedIn),
    iPad2(pageName, ipadTests, loggedIn),
    iPhoneX(pageName, tests, loggedIn),
  ];
  runTestsForDevices({ currentPage, devices, skip });
});
