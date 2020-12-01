import { runTestsForDevices } from "../../../../utils";
import { allDevicesDiffTestsForSignedOut } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
  scrollToPosition,
} from "../../../../utils/helpers";
import { testMobileMailingList } from "../../../../utils/sharedTests/mailingList";
import {
  checkRepoListForTab,
  mostRecentReposClickFlow,
  testMobileRepoList,
} from "../../../../utils/sharedTests/reposContainer";
import {
  testBlogArticles,
  testHomepageSidecar,
} from "../../../../utils/sharedTests/sidecar";
import { Expectation } from "../../../../utils/types";

const pageName = "Discover page with query";
const searchTerm = "dolthub";
const currentPage = `/repositories/${searchTerm}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const exist = newShouldArgs("exist");

  const scrollToPositionInContainer = (
    position: Cypress.PositionType,
  ): Expectation => {
    return scrollToPosition("#main-content", position);
  };

  const clearSearchClickFlow = newClickFlow(
    "[data-cy=clear-search-button-repos]",
    [
      newExpectation(
        "should not have search results tab",
        "[data-cy=search-results-repos-tab]",
        newShouldArgs("not.exist"),
      ),
    ],
    "",
  );

  const testReposContainer = [
    newExpectation(
      "should have repos container",
      "[data-cy=repos-container-with-tabs]",
      newShouldArgs("be.visible.and.contain", "Search results"),
    ),
    ...checkRepoListForTab("discover", 20),
    newExpectationWithClickFlows(
      "should have list of most-recent repos",
      "[data-cy=most-recent-repos-tab]",
      beVisible,
      [mostRecentReposClickFlow],
    ),
    ...checkRepoListForTab("most-starred", 20),
    scrollToPositionInContainer("top"),
    newExpectation(
      "should have repository search bar",
      "[data-cy=search-input-signed-out]",
      beVisible,
    ),
    newExpectationWithClickFlows(
      "should successfully clear search",
      "[data-cy=clear-search-button-repos]",
      beVisible,
      [clearSearchClickFlow],
    ),
    ...checkRepoListForTab("featured", 5),
  ];

  const desktopTests = [
    scrollToPositionInContainer("top"),
    ...testReposContainer,
    ...testHomepageSidecar,
  ];

  const iPadTests = [
    ...testReposContainer,
    scrollToPositionInContainer("center"),
    ...testHomepageSidecar,
  ];

  const iPhoneTests = [
    scrollToPositionInContainer("top"),
    testBlogArticles(exist),
    ...testMobileRepoList("[data-cy=discover-repo-lists]"),
    ...testMobileMailingList("[data-cy=discover-mobile-mailing-list]"),
  ];

  const devices = allDevicesDiffTestsForSignedOut(
    pageName,
    desktopTests,
    iPadTests,
    iPhoneTests,
  );

  runTestsForDevices({ currentPage, devices });
});
