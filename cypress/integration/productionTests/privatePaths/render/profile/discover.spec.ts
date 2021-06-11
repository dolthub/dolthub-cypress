import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Profile discover page";
const currentPage = "/profile/discover";
const loggedIn = true;

const baseUrl = Cypress.env("BASE_URL");

describe(`${pageName} renders expected components on different devices for base url ${baseUrl}`, () => {
  const tests = [
    newExpectation(
      "should render repository list",
      "[data-cy=repository-list-discover]",
      newShouldArgs("be.visible"),
    ),
  ];
  const skip = true;
  const devices = desktopDevicesForAppLayout(pageName, tests, false, loggedIn);
  runTestsForDevices({ currentPage, devices, skip });
});
