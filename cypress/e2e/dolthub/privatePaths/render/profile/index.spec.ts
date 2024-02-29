import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { shouldBeVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Profile my repositories page";
const currentPage = "/profile";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldBeVisible("repository-list-for-user"),
    shouldBeVisible("create-database-button"),
    shouldBeVisible("repolist-search-input"),
  ];

  const skip = false;
  const devices = allDevicesForAppLayout(
    pageName,
    tests,
    tests,
    true,
    loggedIn,
  );
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
