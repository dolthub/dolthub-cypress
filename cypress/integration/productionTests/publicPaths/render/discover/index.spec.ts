import { runTestsForDevices } from "../../../../utils";
import { allDevicesDiffTestsForSignedOut } from "../../../../utils/devices";
import {
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

const pageName = "Discover page";
const currentPage = "/discover";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const exist = newShouldArgs("exist");

  const scrollToPositionInContainer = (
    position: Cypress.PositionType,
  ): Expectation => {
    return scrollToPosition("#main-content", position);
  };

  const testReposContainer = [
    newExpectation(
      "should have repository search bar",
      "[data-cy=search-input-signed-out]",
      beVisible,
    ),
    newExpectation(
      "should have repos container",
      "[data-cy=repos-container-with-tabs]",
      newShouldArgs("be.visible.and.contain", [
        "Featured",
        "Most recent",
        "Most starred",
      ]),
    ),
    ...checkRepoListForTab("featured", 5),
    newExpectationWithClickFlows(
      "should have list of most-recent repos",
      "[data-cy=most-recent-repos-tab]",
      beVisible,
      [mostRecentReposClickFlow],
    ),
    ...checkRepoListForTab("most-starred", 20),
  ];

  const desktopTests = [...testReposContainer, ...testHomepageSidecar];

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
