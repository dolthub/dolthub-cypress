import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Profile my repositories page";
const currentPage = "/profile";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const desktopTests = [
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
      "[data-cy=search-input]",
      beVisible,
    ),
  ];

  // TODO: skip mobile test, wait for sign out button
  /*   const mobileTests = [
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
