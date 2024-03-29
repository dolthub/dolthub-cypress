import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { shouldBeVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Profile starred page";
const currentPage = "/profile/starred";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldBeVisible("create-database-button"),
    shouldBeVisible("repolist-search-input"),
    shouldBeVisible("repository-list-top-20-starred"),
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
