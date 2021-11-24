import { runTestsForDevices } from "../../../../utils";
import { allDevicesForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Profile starred page";
const currentPage = "/profile/starred";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const desktopTests = [
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
  const mobileTests = [
    newExpectation(
      "should render repository list",
      "[data-cy=repository-list-top-20-starred]",
      beVisible,
    ),
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
  ];
  const skip = false;
  const devices = allDevicesForAppLayout(pageName, desktopTests, mobileTests, false, loggedIn);
  runTestsForDevices({ currentPage, devices, skip });
});
