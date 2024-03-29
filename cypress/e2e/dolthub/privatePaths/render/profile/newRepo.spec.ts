import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { shouldBeVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Profile new repository page";
const currentPage = "/profile/new-repository";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldBeVisible("new-repo-form"),
    shouldBeVisible("create-database-button"),
    shouldBeVisible("repolist-search-input"),
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
