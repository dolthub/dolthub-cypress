import { runTestsForDevices } from "../../../../utils";
import { allDevicesForAppLayout } from "../../../../utils/devices";
import {
  newExpectation,
  newShouldArgs,
  scrollToPosition,
} from "../../../../utils/helpers";

const pageName = "Profile bounties repositories page";
const currentPage = "/profile/bounties";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const desktopTests = [
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
    scrollToPosition("#main-content", "center"),
    newExpectation(
      "should render completed bounty databases list",
      "[data-cy=repository-list-completed-bounties]",
      beVisible,
    ),
  ];
  const mobileTests = [
    newExpectation(
      "should not render create database button",
      ["[data-cy=create-database-button]"],
      newShouldArgs("not.be.visible"),
    ),
    newExpectation(
      "should render search input",
      "[data-cy=search-input]",
      beVisible,
    ),
    scrollToPosition("#main-content", "center"),
    newExpectation(
      "should render completed bounty databases list",
      "[data-cy=repository-list-completed-bounties]",
      beVisible,
    ),
  ];
  const skip = false;
  const devices = allDevicesForAppLayout(
    pageName,
    desktopTests,
    mobileTests,
    false,
    loggedIn,
  );
  runTestsForDevices({ currentPage, devices, skip });
});
