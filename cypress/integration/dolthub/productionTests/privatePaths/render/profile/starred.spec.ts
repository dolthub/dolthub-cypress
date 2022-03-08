import { runTestsForDevices } from "../../../../../utils";
import {
  iPad2,
  iPhoneX,
  macbook15ForAppLayout,
} from "../../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../../utils/helpers";

const pageName = "Profile starred page";
const currentPage = "/profile/starred";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const tests = [
    newExpectation(
      "should render repository list",
      "[data-cy=repository-list-top-20-starred]",
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
  ];

  const ipadTests = [
    newExpectation(
      "should render repository list",
      "[data-cy=repository-list-top-20-starred]",
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
  ];

  const skip = false;
  const devices = [
    macbook15ForAppLayout(pageName, tests, false, loggedIn),
    iPad2(pageName, ipadTests, loggedIn),
    iPhoneX(pageName, tests, loggedIn),
  ];
  runTestsForDevices({ currentPage, devices, skip });
});
