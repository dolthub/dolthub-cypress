import { checkRepoListForTab } from "@sharedTests/reposContainer";
import { macbook15ForDoltLabSignedOutLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  shouldBeVisible,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "home page";
const currentPage = "/";

describe(`DoltLab ${pageName} renders expected components`, () => {
  const tests = [
    shouldBeVisible("repolist-search-input"),
    shouldBeVisible("create-database-button"),
    shouldFindAndContain("repos-container-with-tabs", "Discover"),
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
