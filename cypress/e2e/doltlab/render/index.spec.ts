import { checkRepoListForTab } from "@sharedTests/reposContainer";
import { macbook15ForDoltLabSignedOutLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { shouldBeVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "home page";
const currentPage = "/";

describe(`DoltLab ${pageName} renders expected components`, () => {
  const tests = [
    shouldBeVisible("repolist-search-input"),
    shouldBeVisible("repos-container-with-tabs"),
    shouldBeVisible("create-database-button"),
    ...checkRepoListForTab("most-recent", 3),
  ];

  const loggedIn = false;

  const devices = [macbook15ForDoltLabSignedOutLayout(pageName, tests)];
  runTestsForDevices({
    currentPage,
    devices,
    loggedIn,
  });
});
