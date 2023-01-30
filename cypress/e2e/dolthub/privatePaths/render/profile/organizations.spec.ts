import { iPad2, iPhoneX, macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Profile organization page";
const currentPage = "/profile/organizations";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const tests = [
    newExpectation(
      "should render organizations list",
      "[data-cy=organization-list]",
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
    newExpectation(
      "should render create organization form",
      "[data-cy=new-org-form]",
      beVisible,
    ),
  ];
  const ipadTests = [
    newExpectation(
      "should render organizations list",
      "[data-cy=organization-list]",
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
      "should render create organization form",
      "[data-cy=new-org-form]",
      beVisible,
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
