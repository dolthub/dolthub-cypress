import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForAppLayout } from "../../../../utils/devices";
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
    scrollToPosition("#main-content", "center"),
    newExpectation(
      "should render completed bounty databases list",
      "[data-cy=repository-list-completed-bounties]",
      beVisible,
    ),
  ];
  const skip = false;
  const devices = desktopDevicesForAppLayout(pageName, tests, false, loggedIn);
  runTestsForDevices({ currentPage, devices, skip });
});
