import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForSignedOut } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";
import {
  checkRepoListForTab,
  mostRecentReposClickFlow,
} from "../../../../utils/sharedTests/reposContainer";
import { testHomepageSidecar } from "../../../../utils/sharedTests/sidecar";

const pageName = "Discover page with query";
const searchTerm = "dolthub";
const currentPage = `/repositories/${searchTerm}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  // const exist = newShouldArgs("exist");

  const clearSearchClickFlow = newClickFlow(
    "[data-cy=clear-search-button-repos]",
    [
      newExpectation(
        "should have disabled search results tab",
        "[data-cy=search-results-repos-tab]",
        newShouldArgs("have.class", "react-tabs__tab--disabled"),
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

  const desktopTests = [...testReposContainer, ...testHomepageSidecar];

  // const iPadTests = [...testReposContainer, ...testHomepageSidecar];

  // const iPhoneTests = [
  //   testBlogArticles(exist),
  //   ...testMobileRepoList("[data-cy=discover-repo-lists]"),
  //   ...testMobileMailingList("[data-cy=discover-mobile-mailing-list]"),
  // ];

  // const devices = allDevicesDiffTestsForSignedOut(
  //   pageName,
  //   desktopTests,
  //   iPadTests,
  //   iPhoneTests,
  // );
  const devices = desktopDevicesForSignedOut(pageName, desktopTests);

  runTestsForDevices({ currentPage, devices });
});
