import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Profile organization page";
const currentPage = "/profile/organizations";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render repository list",
      "[id=main-content]",
      newShouldArgs("be.visible.and.contain", "Org Memberships"),
    ),
  ];
  const skip = false;
  const devices = desktopDevicesForAppLayout(pageName, tests, false, loggedIn);
  runTestsForDevices({ currentPage, devices, skip });
});
