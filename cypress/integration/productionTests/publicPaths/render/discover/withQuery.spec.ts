import { runTestsForDevices } from "../../../../utils";
import { allDevicesDiffTestsForSignedOut } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";
import {
  checkRepoListForTab,
  testMobileRepoList,
} from "../../../../utils/sharedTests/reposContainer";

const pageName = "Discover page with query";
const searchTerm = "ip-to-country";
const currentPage = `/repositories/${searchTerm}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const clearSearchClickFlow = newClickFlow(
    "[data-cy=clear-search-button]",
    [
      newExpectation(
        "should have repository search bar",
        "[data-cy=search-input]",
        newShouldArgs("be.visible.and.have.value", ""),
      ),
    ],
    "",
  );

  const desktopTests = [
    newExpectation(
      "should have repos container",
      "[data-cy=repos-container-with-tabs]",
      newShouldArgs("be.visible.and.contain", ["Featured", "Discover"]),
    ),
    ...checkRepoListForTab("most-recent", 2),
    newExpectation(
      "should have repository search bar with query",
      "[data-cy=search-input]",
      newShouldArgs("be.visible.and.have.value", searchTerm),
    ),
    newExpectationWithClickFlows(
      "should successfully clear search",
      "[data-cy=clear-search-button]",
      beVisible,
      [clearSearchClickFlow],
    ),
    ...checkRepoListForTab("most-recent", 20),
  ];

  const iPhoneTests = testMobileRepoList("[data-cy=discover-repo-lists]");

  const devices = allDevicesDiffTestsForSignedOut(
    pageName,
    desktopTests,
    desktopTests,
    iPhoneTests,
  );

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
