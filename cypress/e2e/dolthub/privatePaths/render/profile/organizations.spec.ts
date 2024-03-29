import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { shouldBeVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Profile organization page";
const currentPage = "/profile/organizations";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldBeVisible("create-database-button"),
    shouldBeVisible("organization-list"),
    shouldBeVisible("repolist-search-input"),
    shouldBeVisible("new-org-form"),
  ];

  const skip = false;
  const devices = allDevicesForAppLayout(
    pageName,
    tests,
    tests,
    false,
    loggedIn,
  );
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
