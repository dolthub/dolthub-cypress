import { checkRepoListForTab } from "@sharedTests/reposContainer";
import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { shouldBeVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Discover page";
const currentPage = "/discover";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldBeVisible("repolist-search-input"),
    shouldBeVisible("repos-container-with-tabs"),
    ...checkRepoListForTab("most-recent", 15),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices });
});
