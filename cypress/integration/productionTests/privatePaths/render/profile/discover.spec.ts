import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Profile discover page";
const currentPage = "/profile/discover";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const tests = [
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
  ];
  const skip = false;
  const devices = desktopDevicesForAppLayout(pageName, tests, false, loggedIn);
  runTestsForDevices({ currentPage, devices, skip });
});
