import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Profile my repositories page";
const currentPage = "/profile";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render repository list",
      "[data-cy=repository-list]",
      newShouldArgs("be.visible"),
    ),
  ];
  const skip = false;
  const devices = desktopDevicesForAppLayout(pageName, tests, false, loggedIn);
  runTestsForDevices({ currentPage, devices, skip });
});
