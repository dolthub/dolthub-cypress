import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Profile organization page";
const currentPage = "/profile/organizations";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const desktopTests = [
    newExpectation(
      "should render create organization button",
      "[data-cy=create-org-button]",
      beVisible,
    ),
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
      "[data-cy=search-input]",
      beVisible,
    ),
  ];

  // skip mobile test, wait for sign out button
  /*   const mobileTests = [
    newExpectation(
      "should render create organization button",
      "[data-cy=create-org-button]",
      beVisible,
    ),
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
      "[data-cy=search-input]",
      beVisible,
    ),
  ]; */
  const skip = false;
  const devices = desktopDevicesForAppLayout(
    pageName,
    desktopTests,
    false,
    loggedIn,
  );
  runTestsForDevices({ currentPage, devices, skip });
});
